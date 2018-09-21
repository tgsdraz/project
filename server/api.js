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
//采购订单详细数据提交
router.post('/submit', (req, res) => {
  const supplier = req.body.supplier
  let rows = req.body.rows
  pool.getConnection((err, connection) => {
    rows.forEach((item) => {
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
//库存详细信息
router.get('/query3', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from cg_list`, (err, result) => {
      res.send(result)
      connection.release()
    })
  })
})
//获取采购入库单列表
router.get('/query4', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select * from cg_list`, (err, result) => {
      console.log(result)
      res.send(result)
      connection.release()
    })
  })
})
//采购入库详细数据
router.post('/cgTable', (req, res) => {
  const order_number = req.body.order_number
  const rows = req.body.rows
  const operator = req.body.operator
  rows.forEach((item, index) => {
    pool.getConnection((err, connection) => {
      // console.log(item)
      // connection.query(`select * from cg_list where cgood_mark='${item.mark}' and cgood_name='${item.name}' and cgood_model='${item.model}' and cgood_unit='${item.unit}' and cgood_supplier='${item.supplier}' and order_number='${order_number}' and cgood_operator='${operator}' and cgood_depot='${item.depot}'`, (err, result) => {
      //   console.log(result)
      //   if (result.length == 0) {
          const total = parseFloat(item.cg_number) * parseFloat(item.cg_price)
          connection.query(`insert into cg_list(cgood_id,cgood_mark,cgood_name,cgood_model,cgood_unit,cgood_number,cgood_price,cgood_total,cgood_supplier,order_number,cgood_depot) values(0,'${item.mark}','${item.name}','${item.model}','${item.unit}','${item.cg_number}','${item.cg_price}','${total}','${item.supplier}','${order_number}','${item.depot}')`, (err, result) => {
            if (index == rows.length - 1) {
              res.send('success')
            }
            connection.release()
          })
      //   } else {
      //     let num = parseFloat(result[0].cgood_number) + parseFloat(item.cg_number)
      //     let total = parseFloat(result[0].cgood_total) + parseFloat(item.cg_number) * parseFloat(item.cg_price)
      //     let price = (total / num).toFixed(2)
      //     console.log(num, total, price)
      //     connection.query(`update cg_list set cgood_number='${num}',cgood_price='${price}',cgood_total='${total}' where cgood_mark='${item.mark}' and cgood_name='${item.name}' and cgood_model='${item.model}' and cgood_unit='${item.unit}' and cgood_supplier='${item.supplier}' and order_number='${order_number}' and cgood_operator='${operator}' and cgood_depot='${item.depot}'`, (err, result) => {
      //       if (index == rows.length - 1) {
      //         res.send('success')
      //       }
      //       connection.release()
      //     })
      //   }
      // })
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
    let ogood_total = parseFloat(item.outNum) * parseFloat(item.cgood_price)
    if (parseFloat(item.outNum) > 0 && parseFloat(item.outNum) <= parseFloat(item.cgood_number)){
      pool.getConnection((err, connection) => {
        connection.query(`insert into out_list(id,ogood_mark,ogood_name,ogood_model,ogood_unit,ogood_number,ogood_total,ogood_depart) values(0,'${item.cgood_mark}','${item.cgood_name}','${item.cgood_model}','${item.cgood_unit}','${item.outNum}','${ogood_total}','${depart}')`, (err, result) => {
          let num = parseFloat(item.cgood_number) - parseFloat(item.outNum)
          let total = num * parseFloat(item.cgood_price)
            connection.query(`update cg_list set cgood_number='${num}',cgood_total='${total}' where cgood_mark='${item.cgood_mark}' and cgood_name='${item.cgood_name}' and cgood_model='${item.cgood_model}' and cgood_unit='${item.cgood_unit}' and order_number='${item.order_number}' and cgood_price='${item.cgood_price}' and cgood_supplier='${item.cgood_supplier}'`, (err, result) => {
              if (num == 0) {
                connection.query(`delete from cg_list where cgood_number='${num}'`, (err, result) => {
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
    } else if(parseFloat(item.outNum)<0){
      res.send('出库数量必须大于零')
      connection.release()
    }else{
      res.send('fail')
      connection.release()
    }
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
