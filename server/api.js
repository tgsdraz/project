const express = require('express');
const router = express.Router();
const pool = require('../database/pool')
//进货管理==>物品数量为零时 删除数据 同时更新数据库
router.post('/delete', (req, res) => {
    const data = req.body
    console.log(data)
    pool.getConnection((err, connection) => {
        connection.query(`delete from good where good_name='${data.good_name}' and good_mark='${data.good_mark}'`, (err, result) => {
            console.log(result);
            res.send(result);
            connection.release()
        })
    })
})
//进货管理==》增加或减少物品 更新数据库
router.post('/update', (req, res) => {
    const data = req.body
    pool.getConnection((err, connection) => {
        connection.query(`update good set good_num='${data.good_num}' where good_name='${data.good_name}' and good_mark='${data.good_mark}'`, (err, result) => {
            res.send(result);
            connection.release()
        })
    })
})
router.get('/get', (req, res) => {

    pool.getConnection((err, connection) => {
        connection.query(`select * from good`, (err, result) => {
            console.log(result);
            res.send(result);
            connection.release()
        })
    })
})
router.post('/login', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        remember:req.body.remember
    }
    pool.getConnection((err, connection) => {
        connection.query(`select * from user where username='${user.username}' and password='${user.password}'`, (err, result) => {
            console.log(result);
            res.send(result);
            connection.release()
        })
    })
})
router.post('/regedit', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        password1:req.body.password1
    }
    pool.getConnection((err, connection) => {
        connection.query(`select * from user where username='${user.username}'`, (err, result) => {
            console.log(result);
            if (result.length == 0) {
                if(user.password == user.password1){
                    connection.query(`insert into user(user_id,username,password) values(0,'${user.username}','${user.password}')`, (err, result) => {
                        if (err)
                            throw err
                        console.log(result);
                        res.send('success');
                        connection.release()
                    })
                }else{
                    res.send('密码不一致')
                    connection.release()
                }
                
            } else {
                res.send('fail')
                connection.release()
            }

        })

    })
})
//获取供应商列表
router.get('/supplier',(req,res) => {
    pool.getConnection((err,connection) => {
        connection.query(`select supplier_name from supplier`,(err,result) => {
            res.send(result)
            connection.release()
        })
    })
})
//添加供应商
router.post('/addSupplier', (req, res) => {
    const supplier = {
        name: req.body.name,
        jx: req.body.jx,
        phone: req.body.phone,
        address: req.body.address
    }

    // '${goods.good_name}','${goods.good_price}','${goods.good_mark}'
    // console.log(supplier)
    pool.getConnection((err, connection) => {
        if (supplier.name && supplier.jx && supplier.phone && supplier.address) {
            connection.query(`select * from supplier where supplier_name='${supplier.name}'`, (err, result) => {
                // console.log(result);
                if (result.length === 0) {
                    connection.query(`insert into supplier(supplier_id,supplier_name,supplier_jx,supplier_phone,supplier_address) values(0,'${supplier.name}','${supplier.jx}','${supplier.phone}','${supplier.address}')`, (err, result) => {
                        console.log(result)
                        res.send('success')
                        connection.release()
                    })
                } else {
                    res.send('供应商已存在')
                }
            })
        } else {
            res.send('数据不能为空')
        }

    })
})
//添加商品

router.post('/addGoods', (req, res) => {
    const goods = {
        mark: req.body.mark,
        name: req.body.name,
        model: req.body.model,
        unit: req.body.unit
    }

    // '${goods.good_name}','${goods.good_price}','${goods.good_mark}'
    // console.log(goods)
    pool.getConnection((err, connection) => {
        if (goods.name && goods.mark && goods.model && goods.unit) {
            connection.query(`select * from good_type where good_name='${goods.name}' and good_mark='${goods.mark}' and good_model='${goods.model}'`, (err, result) => {
                // console.log(result);
                if (result.length === 0) {
                    connection.query(`insert into good_type(id,good_mark,good_name,good_model,good_unit) values(0,'${goods.mark}','${goods.name}','${goods.model}','${goods.unit}')`, (err, result) => {
                        console.log(result)
                        res.send('success')
                        connection.release()
                    })
                } else {
                    res.send('商品已存在')
                }
            })
        } else {
            res.send('数据不能为空')
        }

    })
})
//采购订单商品选择 获取商品列表
router.get('/search',(req,res) => {
    pool.getConnection((err,connection) => {
        connection.query(`select * from good_type`,(err,result) => {
            // console.log(result)
            res.send(result)
            connection.release()
        })
    })
})
//采购订单数据保存
router.post('/save',(req,res) => {
    console.log(req.body)
    const supplier = req.body.supplier
    const rows = req.body.rows
    pool.getConnection((err,connection) => {
        rows.forEach((item) => {
            
                    connection.query(`select * from table_list where supplier='${supplier}' and good_mark='${item.mark}' and good_name='${item.name}' and good_model='${item.model}' and good_unit='${item.unit}' and good_price='${item.price}'`,(err,result) => {
                        // console.log(result)
                        if(result.length == 0){
                            const total = parseInt(item.number) * parseFloat(item.price)
                            connection.query(`insert into table_list(id,good_mark,good_name,good_model,good_unit,good_number,good_price,total_price,supplier) values(0,'${item.mark}','${item.name}','${item.model}','${item.unit}','${item.number}','${item.price}','${total}','${supplier}')`,(err,result) => {
                                // console.log(result)
                                res.send('success')
                                // connection.release()
                            })
                        }else{
                            // connection.query(`select * from table_list where supplier='${supplier}' and good_mark='${item.mark}' and good_name='${item.name}' and good_model='${item.model}' and good_unit='${item.unit}' and good_price='${item.price}'`)
                            let number = parseInt(result[0].good_number)
                            let total = parseFloat(result[0].total_price)
                            // console.log(number)
                            number += parseInt(item.number)
                            total += parseInt(item.number) * parseFloat(item.price)
                            // console.log(number,total)
                            connection.query(`update table_list set good_number='${number}',total_price='${total}' where supplier='${supplier}' and good_mark='${item.mark}' and good_name='${item.name}' and good_model='${item.model}' and good_unit='${item.unit}' and good_price='${item.price}'`,(err,result) => {
                                res.send('数据更新成功')
                                // connection.release()
                            })
                        }
                    })
                
            
        })
    })
})
//订单查询
router.get('/query',(req,res) => {
    pool.getConnection((err,connection) => {
        connection.query(`select * from table_list`,(err,result) => {
            res.send(result)
            connection.release()
        })
    })
})
router.post('/add', (req, res) => {
    const goods = {
        good_mark: req.body.good_mark,
        good_name: req.body.good_name,
        good_price: req.body.good_price,
        good_num: req.body.good_num
    }

    // '${goods.good_name}','${goods.good_price}','${goods.good_mark}'
    console.log(goods)
    pool.getConnection((err, connection) => {
        if (goods.good_mark && goods.good_name && goods.good_num && goods.good_price) {
            connection.query(`select * from good where good_mark='${goods.good_mark}' and good_name='${goods.good_name}'`, (err, result) => {
                console.log(result);
                if (result.length === 0) {
                    connection.query(`insert into good(good_id,good_name,good_price,good_mark,good_num) values(0,'${goods.good_name}','${goods.good_price}','${goods.good_mark}','${goods.good_num}')`, (err, result) => {
                        console.log(result)
                        res.send('添加成功')
                        connection.release()
                    })
                } else {
                    console.log(typeof result[0].good_num)
                    const num = result[0].good_num + parseInt(goods.good_num)
                    console.log(num)
                    connection.query(`update good set good_num=${num} where good_mark='${goods.good_mark}'`, (err, result) => {
                        console.log(result)
                        res.send('数据更新成功')
                        connection.release()
                    })
                }
            })
        } else {
            res.send('fail')
        }

    })
})
module.exports = router;