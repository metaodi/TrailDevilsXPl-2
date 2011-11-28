Ext.data.TrailLocalProxy = Ext.extend(Ext.data.LocalStorageProxy, {
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
		}
});

Ext.data.ProxyMgr.registerType('traillocal', Ext.data.TrailLocalProxy);