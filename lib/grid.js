var Grid = require('mongodb').Grid;
var GridStore = require('mongodb').GridStore;
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
exports.Grid =Grid;
exports.GridStore = GridStore;
exports.ObjectID =ObjectID;
exports.fs = fs;
exports.File = function(db){
	this.file_id = this.ObjectID || new exports.ObjectID();
	if (!db) {console.log("数据库不存在")};
	this.db=db;
	/**
	 * [Write description] 设置写
	 */
	this.Write=function(){
		this.type="W";
		return this;
	}
	/**
	 * [Read description]	设置读文件
	 */
	this.Read=function(){
		this.type="R";
		return this;
	}
	/**
	 * [setFilePath description]	设置写文件路径
	 * @param {[String]} a [description]
	 */
	this.setUpFilePath=function(a){
		this.FilePath = a;
		return this;
	}
	/**
	 * [setReadFile_Id description]	设置读文件_id
	 * @param {[String]} a [description]
	 */
	this.setReadFile_Id=function(a)
	{
		this.FileId=a;
		return this;
	}
	/**
	 * [setUpFileName description]
	 * @param {[String]} a [description]
	 */
	this.setUpFileName=function(a){
		this.FileName=a;
		return this;
	}
    /**
     * WriteFile 向数据库写文件
     * @param E_callback    执行错误回调
     * @param S_callback    执行成功回调
     */
	this.WriteFile=function(E_callback,S_callback){
		var _Grid = new GridStore(this.db,this.FileName,"w");
        that = this;
        console.log(this.FilePath);
		//fs.readFile(this.FilePath,function(err,data){
		//	if (err) {
		//		E_callback(err);
		//		return;
		//	};
            _Grid.writeFile(this.FilePath,function(err,doc){
				if (err) {
					console.log("err:"+err);
					E_callback(err);
					return;
				};
				S_callback(doc);
			})
			// this.Grid.open(function(err,g2){
			// })
		//});
	}
	this.ReadFile = function(E_callback,S_callback){
		exports.GridStore.read(db,this.FileId,function(err,fileData)
		{
			if (err) {
				console.log(err);
				E_callback(err);
				return;
			};
			S_callback(fileData);
		})
		//this.Grid = new GridStore(db,"qwdwqdwqdwqd1","w");
		//var fileSize = fs.statSync("BaiduYun821.exe");
		//var file = fs.readFileSync("BaiduYun821.exe");
		//console.log(file);
		//console.log(fileSize);
		//that = this;
		////this.Grid.open(function(err,g2){
		//that.Grid.writeFile(file,function(err,doc){
		//	if (err) {
		//		console.log("err:"+err);
		//	};
		//	console.log(doc);
		//	exports.GridStore.read(db,"qwdwqdwqdwqd1",function(err,fileData)
		//	{
		//		fs.writeFile("BaiduYun82122.exe",fileData,function(){
		//			console.log(2333);
		//		})
		//	})
		//}
	}
	/**
	 * [go 执行]
	 * @param  {[Function]} E_callback [错误执行回调]
	 * @param  {[Function]} S_callback [正确执行回调]
	 */
	this.go=function(E_callback,S_callback){
		E_callback= E_callback||this.E_callback;
		S_callback=S_callback||this.S_callback;
		if (this.type == "W") {
			this.WriteFile(E_callback,S_callback);
			return;
		}
		this.ReadFile(E_callback,S_callback);
	}
	/**
	 * [E_callback description]
	 * @param {Object} err [错误信息]
	 */
	this.E_callback=function(err){
		throw Error(err)
	}
	/**
	 * [S_callback description]
	 * @param {Object} data [成功信息]
	 */
	this.S_callback=function(data){
		console.log(data);
	}
}
