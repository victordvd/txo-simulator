declare function functionPlot(arg: any): any;

console.log('test start!');

var POS = '[{"ls":"L","contract":{"type":"C","strike":18200,"bid":47.5,"ask":48},"price":48},{"ls":"S","contract":{"type":"C","strike":18300,"bid":33.5,"ask":35.5},"price":33.5}]'

/* [{"ls":"L","contract":{"type":"C","strike":18200,"bid":47.5,"ask":48},"price":48},
{"ls":"S","contract":{"type":"C","strike":18300,"bid":33.5,"ask":35.5},"price":33.5}] */
function parsePosition(o:any){
  let ls = (o.ls =='L') ? LS.LONG : LS.SHORT
  let contract = o.contract
  let type = (contract.type=='C')?CP.CALL:CP.PUT
  let strike = contract.strike
  let price = o.price

  return PositionModel.getTXOInstance(ls, type,Contract.TXO, strike, 1, price)
}

$(function () {

  let srcPos = JSON.parse(POS)


  let pTable = $('table')
  // let m_1 = PositionModel.getTXOInstance(LS.LONG, CP.CALL,Contract.TXO, 16000, 1, 64.5)

  let m_0 = parsePosition(srcPos[0])
  let m_1 = parsePosition(srcPos[1])

  console.log(m_0)
console.log(m_1)

  m_0.addRow(pTable)
  m_1.addRow(pTable)

  $('#addBtn').click(()=>{
    let pTable = $('table')
    let m_2 = PositionModel.getTXOInstance(LS.LONG, CP.CALL,Contract.TXO, 16000, 1, 64.5)
  
    m_2.addRow(pTable)

    PostionStore.getData().push(m_2)
    PostionStore.plotPosition()

  })

  $('#spot').change(()=>{
 
    PostionStore.plotPosition()

  })

  PostionStore.getData().push(m_1)

  // CanvasBuilder.init()

  PostionStore.plotPosition()
})
