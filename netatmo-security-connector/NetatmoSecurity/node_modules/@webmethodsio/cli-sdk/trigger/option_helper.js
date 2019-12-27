
module.exports = function Meta(meta){

	this.meta = (meta && typeof(meta) === 'object') ? meta : {}

	this.setMeta = function(arg1, arg2){
		var me = this
		if(arg1 && typeof(arg1) === 'object'){
			Object.keys(arg1).forEach((item)=>{
				me.meta[item] = arg1[item]
			})
		}else if(arg1 && 
			typeof(arg1) === 'string' && 
			typeof(arg2) === 'string'){
				me.meta[arg1] = arg2
		}
	}

	this.getMeta = function(key){
		return this.meta[key]
	}
}


