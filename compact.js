
// 0.0.1

function compactCollections(dbName){
   var dbToCompact = db.getSisterDB(dbName);

	dbToCompact.getCollectionNames().forEach(function(cName) {

		if( cName.indexOf("system") != -1)	
			return;

		coll = dbToCompact[cName]; 
		print("--------------------")	
		print("collections:" + cName);

		print("count: " + coll.count());
		var storage = coll.stats().storageSize;
		var size = coll.stats().size;
		print(" storage: " + storage);				
		print(" size: " + size);				

		dbToCompact.runCommand ( { compact: cName } );

		var storagepost = coll.stats().storageSize;
		var sizepost = coll.stats().size;
		print(" storagepost: " + storagepost);				
		print(" sizepost: " + sizepost);				


   });

};


	listDatabases = db.adminCommand('listDatabases')

	print("Tot dbs:" + listDatabases.databases.length);
	for(var i=0; i<listDatabases.databases.length;i++){
					print("******************************");
					print("Start Compact db:" + listDatabases.databases[i].name);
					compactCollections(listDatabases.databases[i].name);
	 };

