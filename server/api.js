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
//登录页面
router.post('/login', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    remember: req.body.remember
  }
  pool.getConnection((err, connection) => {
    connection.query(`select * from user where username='${user.username}' and password='${user.password}'`, (err, result) => {
      console.log(result);
      res.send(result);
      connection.release()
    })
  })
})
//注册页面
router.post('/regedit', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    password1: req.body.password1
  }
  pool.getConnection((err, connection) => {
    connection.query(`select * from user where username='${user.username}'`, (err, result) => {
      console.log(result);
      if (result.length == 0) {
        if (user.password == user.password1) {
          connection.query(`insert into user(user_id,username,password) values(0,'${user.username}','${user.password}')`, (err, result) => {
            if (err)
              throw err
            console.log(result);
            res.send('success');
            connection.release()
          })
        } else {
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
router.get('/supplier', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select supplier_name from supplier`, (err, result) => {
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
  pool.getConnection((err, connection) => {
    if (supplier.name && supplier.jx && supplier.phone && supplier.address) {
      connection.query(`select * from supplier where supplier_name='${supplier.name}'`, (err, result) => {
        if (result.length === 0) {
          connection.query(`insert into supplier(supplier_id,supplier_name,supplier_jx,supplier_phone,supplier_address) values(0,'${supplier.name}','${supplier.jx}','${supplier.phone}','${supplier.address}')`, (err, result) => {
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
//添加仓库
router.post('/addDepot', (req, res) => {
  const depot = {
    name: req.body.name,
    jx: req.body.jx
  }
  pool.getConnection((err, connection) => {
    if (depot.name && depot.jx) {
      connection.query(`select * from depots where depot_name='${depot.name}'`, (err, result) => {
        if (result.length === 0) {
          connection.query(`insert into depots(depot_name,depot_jx) values('${depot.name}','${depot.jx}')`, (err, result) => {
            res.send('success')
            connection.release()
          })
        } else {
          res.send('仓库已存在')
        }
      })
    } else {
      res.send('数据不能为空')
    }

  })
})
//添加部门
router.post('/addDepartment', (req, res) => {
  const department = {
    name: req.body.name,
    jx: req.body.jx
  }
  pool.getConnection((err, connection) => {
    if (department.name && department.jx) {
      connection.query(`select * from department where department_name='${department.name}'`, (err, result) => {
        if (result.length === 0) {
          connection.query(`insert into department(department_name,department_jx) values('${department.name}','${department.jx}')`, (err, result) => {
            res.send('success')
            connection.release()
          })
        } else {
          res.send('部门已存在')
        }
      })
    } else {
      res.send('数据不能为空')
    }

  })
})
//获取部门数据
router.get('/depart', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select department_name from department`, (err, result) => {
      // console.log(result)
      res.send(result)
      connection.release()
    })
  })
})
//添加管理人员
router.post('/addExecutive', (req, res) => {
  const executive = {
    name: req.body.name,
    jx: req.body.jx,
    age: req.body.age,
    phone: req.body.phone,
    zw: req.body.zw,
  }
  pool.getConnection((err, connection) => {
    if (executive.name && executive.jx) {
      connection.query(`select * from executives where executive_name='${executive.name}' and executive_jx='${executive.jx}'`, (err, result) => {
        if (result.length === 0) {
          connection.query(`insert into executives(executive_name,executive_jx,executive_age,executive_phone,executive_zw) values('${executive.name}','${executive.jx}','${executive.age}','${executive.phone}','${executive.zw}')`, (err, result) => {
            res.send('success')
            connection.release()
          })
        } else {
          res.send('人员已存在')
          connection.release()
        }
      })
    } else {
      res.send('数据不能为空')
      connection.release()
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
router.get('/search', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from good_type`, (err, result) => {
      // console.log(result)
      res.send(result)
      connection.release()
    })
  })
})
//采购入库 点击获取入库人员
router.get('/operator', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select executive_name from executives`, (err, result) => {
      // console.log(result)
      res.send(result)
      connection.release()
    })
  })
})
//采购入库 点击获取仓库列表
router.get('/depots', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select depot_name from depots`, (err, result) => {
      // console.log(result)
      res.send(result)
      connection.release()
    })
  })
})
//采购订单表
router.post('/save', (req, res) => {
  // console.log(req.body)
  const purchase_num = req.body.purchaseNum
  const purchase_name = req.body.purchaseName
  const supplier = req.body.supplier
  const rows = JSON.stringify(req.body.rows)
  const flag = req.body.flag
  console.log(rows)
  pool.getConnection((err, connection) => {
    connection.query(`insert into html(purchase_num,purchase_name,supplier,rows,flag) values('${purchase_num}','${purchase_name}','${supplier}','${rows}','${flag}')`, (err, result) => {
      res.send('success')
      connection.release()
    })
  })
})
//更新采购订单列表
router.post('/updateHtml', (req, res) => {
  // console.log(req.body)
  const id = req.body.id
  const flag = req.body.flag
  console.log(flag, id)
  pool.getConnection((err, connection) => {
    connection.query(`update html set flag='${flag}' where purchase_num='${id}'`, (err, result) => {
      console.log(result)
      res.send('success')
      connection.release()
    })
  })
})
//更新采购入库单列表
router.post('/updateInList', (req, res) => {
  // console.log(req.body)
  const id = req.body.id
  const flag = req.body.flag
  console.log(flag, id)
  pool.getConnection((err, connection) => {
    connection.query(`update in_list set flag='${flag}' where store_number='${id}'`, (err, result) => {
      console.log(result)
      res.send('success')
      connection.release()
    })
  })
})
//采购订单详细数据提交
router.post('/submit', (req, res) => {
  const supplier = req.body.supplier
  let rows = req.body.rows
  rows.forEach((item) => {
  pool.getConnection((err, connection) => {
      connection.query(`select * from table_list where supplier='${supplier}' and good_mark='${item.mark}' and good_name='${item.name}' and good_model='${item.model}' and good_unit='${item.unit}' and good_price='${item.price}'`, (err, result) => {
        if (result.length == 0) {
          const total = parseInt(item.number) * parseFloat(item.price)
          connection.query(`insert into table_list(id,good_mark,good_name,good_model,good_unit,good_number,good_price,total_price,supplier) values(0,'${item.mark}','${item.name}','${item.model}','${item.unit}','${item.number}','${item.price}','${total}','${supplier}')`, (err, result) => {
            // res.send('success')
            connection.release()
          })
        } else {
          let number = parseInt(result[0].good_number)
          let total = parseFloat(result[0].total_price)
          number += parseInt(item.number)
          total += parseInt(item.number) * parseFloat(item.price)
          connection.query(`update table_list set good_number='${number}',total_price='${total}' where supplier='${supplier}' and good_mark='${item.mark}' and good_name='${item.name}' and good_model='${item.model}' and good_unit='${item.unit}' and good_price='${item.price}'`, (err, result) => {
            // res.send('数据更新成功')
            connection.release()
          })
        }
      })
    })
  })
})
// 采购订单flag=on列表查询
router.get('/query', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from html where flag='on'`, (err, result) => {
      res.send(result)
      connection.release()
    })
  })
})
//订单详情查询
router.get('/query1', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from table_list`, (err, result) => {
      res.send(result)
      connection.release()
    })
  })
})
// 采购订单全部列表查询
router.get('/query2', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from html`, (err, result) => {
      res.send(result)
      connection.release()
    })
  })
})
//采购入库单列表
router.get('/query3', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from in_list`, (err, result) => {
      res.send(result)
      connection.release()
    })
  })
})
//获取采购入库单详情
router.get('/query4', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from cg_list`, (err, result) => {
      console.log(result)
      res.send(result)
      connection.release()
    })
  })
})
//获取采购入库单列表（flag= on）
router.get('/query5', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from in_list where flag='on'`, (err, result) => {
      res.send(result)
      connection.release()
    })
  })
})
//获取库存列表
router.get('/query6', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from in_storelist`, (err, result) => {
      res.send(result)
      connection.release()
    })
  })
})
//获取出库列表
router.get('/query7', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from out_list`, (err, result) => {
      res.send(result)
      connection.release()
    })
  })
})
//采购入库单详细数据到cg_list   
router.post('/cgTable', (req, res) => {
  const order_number = req.body.order_number
  const order_name = req.body.order_name
  const rows = req.body.rows
  pool.getConnection((err, connection) => {
    rows.forEach((item, index) => {
      const total = parseFloat(item.cg_number) * parseFloat(item.cg_price)
      connection.query(`insert into cg_list(cgood_id,cgood_mark,cgood_name,cgood_model,cgood_unit,cgood_number,cgood_price,cgood_total,cgood_supplier,order_number,cgood_depot) values(0,'${item.mark}','${item.name}','${item.model}','${item.unit}','${item.cg_number}','${item.cg_price}','${total}','${item.supplier}','${order_number}','${item.depot}')`, (err, result) => {
        if (index == rows.length - 1) {
          res.send('success')
          connection.release()
        }
      })
    })
  })
})
//采购入库单 到 in_list
router.post('/cgTable1', (req, res) => {
  const order_number = req.body.order_number
  const order_name = req.body.order_name
  const rows = req.body.rows
  pool.getConnection((err, connection) => {
    connection.query(`insert into in_list(store_number,store_name,store_rows,flag) values('${order_number}','${order_name}','${JSON.stringify(rows)}','on')`, (err, result) => {
      res.send('success')
      connection.release()
    })
  })
})
//入库单详细数据
router.post('/inStore', (req, res) => {
  console.log(req.body)
  const order_number = req.body.order_number
  const order_name = req.body.order_name
  const rows = req.body.rows
  const owner = req.body.owner
  const date = req.body.date

  console.log(rows)
  rows.forEach((item, index) => {
    pool.getConnection((err, connection) => {
      connection.query(`select * from in_storelist where i_mark='${item.mark}' and i_name='${item.name}' and i_model='${item.model}' and i_unit='${item.unit}'`,(err,result) => {
        console.log(result)
        if(result.length == 0){
          connection.query(`insert into in_storelist(id,i_mark,i_name,i_model,i_unit,i_num,i_price,i_total) values(0,'${item.mark}','${item.name}','${item.model}','${item.unit}','${item.cg_number}','${item.cg_price}','${item.total}')`,(err,result) => {
            console.log(result)
            if(index == rows.length - 1){
              res.send('success')
  
            }
            connection.release()
          })
        }else{
          let num = parseFloat(result[0].i_num) + parseFloat(item.cg_number)
          let total = parseFloat(result[0].i_total) + parseFloat(item.total)
          let price = (total / num).toFixed(2)
          connection.query(`update in_storelist set i_num='${num}',i_price='${price}',i_total='${total}' where i_mark='${item.mark}' and i_name='${item.name}' and i_model='${item.model}' and i_unit='${item.unit}'`,(err,result) => {
            if(index == rows.length - 1){
              res.send('success')
            }
            connection.release()
          })
        }
      })

    })
  })
})
//出库单数据库数据插入
router.post('/outlist', (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const depart = req.body.depart
  const store = req.body.store

  store.forEach((item, index) => {
    let ogood_total = parseFloat(item.outNum) * parseFloat(item.i_price)
    if (parseFloat(item.outNum) > 0 && parseFloat(item.outNum) <= parseFloat(item.i_num)) {
      pool.getConnection((err, connection) => {
        connection.query(`insert into out_list(id,ogood_mark,ogood_name,ogood_model,ogood_unit,ogood_number,ogood_total,ogood_depart) values(0,'${item.i_mark}','${item.i_name}','${item.i_model}','${item.i_unit}','${item.outNum}','${item.i_total}','${depart}')`, (err, result) => {
          let num = parseFloat(item.i_num) - parseFloat(item.outNum)
          let total = num * parseFloat(item.i_price)
          connection.query(`update in_storelist set i_num='${num}',i_total='${total}' where i_mark='${item.i_mark}' and i_name='${item.i_name}' and i_model='${item.i_model}' and i_unit='${item.i_unit}'`, (err, result) => {
            if (num == 0) {
              connection.query(`delete from in_storelist where i_num='${num}'`, (err, result) => {
                console.log(result)
              })
            }
            if (index == store.length - 1) {
              res.send('success')
            }
            connection.release()
          })


        })
      })
    } else if (parseFloat(item.outNum) <= 0) {
      res.send('出库数量必须大于零')
      connection.release()
    } else {
      res.send('fail')
      connection.release()
    }
  })
})

module.exports = router;
