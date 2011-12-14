Ext.data.TrailsLocalProxy = Ext.extend(Ext.data.LocalStorageProxy, {
	/* WORKAROUND FOR SENCHA BUG: operation was not set to successful, therefore it is not possible to *only* remove records from a store
	 * Source: http://www.sencha.com/forum/showthread.php?122493-WebStorageProxy-issue
	 */
	//inherit
	destroy: function(operation, callback, scope) {
		var records = operation.records,
			length  = records.length,
			ids     = this.getIds(),

			//newIds is a copy of ids, from which we remove the destroyed records
			newIds  = [].concat(ids),
			i;

		for (i = 0; i < length; i++) {
			newIds.remove(records[i].getId());
			this.removeRecord(records[i], false);
		}

		this.setIds(newIds);

		// Sencha-Bug: operation was not set completed/sucsessful
		operation.setCompleted();
		operation.setSuccessful();

		if (typeof callback == 'function') {
			callback.call(scope || this, operation);
		}
	},
	
	/**
     * @private
     * Fetches a model instance from the Proxy by ID. Runs each field's decode function (if present) to decode the data
     * @param {String} id The record's unique ID
     * @return {Ext.data.Model} The model instance
     */
    getRecord: function(id) {
        if (this.cache[id] == undefined) {
            var rawData = Ext.decode(this.getStorageObject().getItem(this.getRecordKey(id))),
                data    = {},
                Model   = this.model,
                fields  = Model.prototype.fields.items,
                length  = fields.length,
                i, field, name, record;
			
			/*
			 * WORKAROUND FOR SENCHA BUG:
			 * Read record only if record was found in store.
			 * Otherwise remove record from id-list and return null
			 */
			if(rawData) {
				for (i = 0; i < length; i++) {
					field = fields[i];
					name  = field.name;

					if (typeof field.decode == 'function') {
						data[name] = field.decode(rawData[name]);
					} else {
						data[name] = rawData[name];
					}
				}

				record = new Model(data, id);
				record.phantom = false;
				
				this.cache[id] = record;
			} else {
				// if record wasn't found -> remove from id list
				var ids = this.getIds();
				ids.remove(id);
				this.setIds(ids);
				
				return null;
			}
        }
        
        return this.cache[id];
    },
	
	//inherit docs
    read: function(operation, callback, scope) {
        //TODO: respect sorters, filters, start and limit options on the Operation
        var records = [],
            ids     = this.getIds(),
            length  = ids.length,
            i, recordData, record;
        
        //read a single record
        if (operation.id) {
            record = this.getRecord(operation.id);
			
            if (record) {
                records.push(record);
                operation.setSuccessful();
            }
        } else {
            for (i = 0; i < length; i++) {
				/*
				 * WORKAROUND FOR SENCHA BUG:
				 * add record only to records-array if record was found in store
				 */
				var record = this.getRecord(ids[i]);
				
				if (record) {
					records.push(record);
				}
            }
            operation.setSuccessful();
        }
        
        operation.setCompleted();

        operation.resultSet = new Ext.data.ResultSet({
            records: records,
            total  : records.length,
            loaded : true
        });

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    }
});

Ext.data.ProxyMgr.registerType('trailslocal', Ext.data.TrailsLocalProxy);