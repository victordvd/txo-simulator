console.log('test start!');
var POS = '[{"ls":"L","contract":{"type":"C","strike":18200,"bid":47.5,"ask":48},"price":48},{"ls":"S","contract":{"type":"C","strike":18300,"bid":33.5,"ask":35.5},"price":33.5}]';
/* [{"ls":"L","contract":{"type":"C","strike":18200,"bid":47.5,"ask":48},"price":48},
{"ls":"S","contract":{"type":"C","strike":18300,"bid":33.5,"ask":35.5},"price":33.5}] */
function parsePosition(o) {
    var ls = (o.ls == 'L') ? LS.LONG : LS.SHORT;
    var contract = o.contract;
    var type = (contract.type == 'C') ? CP.CALL : CP.PUT;
    var strike = contract.strike;
    var price = o.price;
    return PositionModel.getTXOInstance(ls, type, Contract.TXO, strike, 1, price);
}
$(function () {
    var srcPos = JSON.parse(POS);
    var pTable = $('table');
    // let m_1 = PositionModel.getTXOInstance(LS.LONG, CP.CALL,Contract.TXO, 16000, 1, 64.5)
    var m_0 = parsePosition(srcPos[0]);
    var m_1 = parsePosition(srcPos[1]);
    console.log(m_0);
    console.log(m_1);
    m_0.addRow(pTable);
    m_1.addRow(pTable);
    $('#addBtn').click(function () {
        var pTable = $('table');
        var m_2 = PositionModel.getTXOInstance(LS.LONG, CP.CALL, Contract.TXO, 16000, 1, 64.5);
        m_2.addRow(pTable);
        PostionStore.getData().push(m_2);
        PostionStore.plotPosition();
    });
    $('#spot').change(function () {
        PostionStore.plotPosition();
    });
    PostionStore.getData().push(m_1);
    // CanvasBuilder.init()
    PostionStore.plotPosition();
});
