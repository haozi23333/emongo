/**
 *  easymongodb.js
 *  create by haozi
 *  2015-12-15
 */
exports.mongodb = require('mongodb');
exports.Grid = require("./grid");
exports.fs  = require("fs");
console.log("load");
/**
 * link
 * @param  {String} ip           数据库ip
 * @param  {int}    port         数据库port
 * @param  {String} db_name      数据库集合
 * @param  {String} username     管理员账户名称
 * @return {object} link object  管理员密码
 */
exports.link=function(ip,port,db_name,username){
    this.d=1;
    this.serverip = ip || 'loaclhost';
    this.serverport = port || 27017;
    this.db_name=db_name || '';
    if (this.db_name=='')
    {
        console.log("数据库名称为空");
        return;
    }
    this.server = new exports.mongodb.Server(this.serverip, this.serverport, { auto_reconnect: true });
    this.db=new exports.mongodb.Db(db_name, this.server, { safe: true });
    if (this.db)
        this.db.open(function (err, db) {
            if (err)
                handleError(err);
        })
    else {
        console.error("连接数据库集合失败");
    }
    /**
     * execfun
     * @param  {object}     gc          参数数组
     * @param  {fuanction}  success     成功的回调
     * @param  {fuanction}  error       失败的回调
     * @return {null}       null
     */
    this.execfun=function(gc,success,error)
    {
        this.db.eval(this.splitfun(gc), function (err, _json) {
            if(_json)
                success(_json);
            else
                error(_json);
        });
    }
    /**
     * splitfun 拼接存储过程
     * @param  {object} a 需要拼接的对象/字符串数组
     * @return {String}   拼接完成的存储过程
     */
    this.splitfun=function(a) {
        var c = a[0] + "(";
        for (var i = 1; i < a.length; i++) {
            if(i== a.length-1)
                c+=JSON.stringify(a[i]).replace(/"/g,"'")+")";
            else
                c+=JSON.stringify(a[i]).replace(/"/g,"'")+",";
        }
        return c;
    }
    this.upfile=function(a){
       return new exports.Grid.File(a);
    }
    this.exit=function(){
        this.db.close();
        console.log("数据库"+this.db_name+"已经关闭")
    }

}

