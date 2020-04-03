import Dexie from 'dexie'

export class DBAccessCtrl {

    constructor(dbName) {
        this.dbName = dbName
    }

    async updateData(user) {
        const id = user.id;
        delete user.id;
        this.dexieDB = await new Dexie(this.dbName).open();
        let updateUser = await this.dexieDB.table('users').update(id, user);
        if (updateUser !== 1) {
            console.log('Update Failed:', user);
        }
        return this.getData();
    }

    async getData (id) {
        let users
        this.dexieDB = await new Dexie(this.dbName).open();
        if (id) {
            users = await this.dexieDB.table('users').get(id);
        } else {
            users = await this.dexieDB.table('users').toArray();
        }
        return users;
    }

    async deleteData (id) {
        this.dexieDB = await new Dexie(this.dbName).open();
        let deleteUser = await this.dexieDB.table('users').where('id').equals(id).delete();
        if (deleteUser !== 1) {
            console.log('Delete Failed:', deleteUser);
        }
        let users = await this.dexieDB.table('users').toArray();
        return users;

    }

    async store (userInfo) {
         // Declare db instance
         this.dexieDB = new Dexie(this.dbName);
        // Define Database Schema
        this.dexieDB.version(1).stores({
            users: '++id, firstname, lastname, email, company'
        });
        // Open Database
        // this.dexieDB.open();

        let insert_object = {
            firstname : userInfo.firstName,
            lastname : userInfo.lastName,
            email : userInfo.email,
            company : userInfo.company
        };
        // Interact With Database
        await this.dexieDB.transaction('rw', this.dexieDB.users, function* () {
            // Let's add some data to db:
            var input1 = yield this.users.add(insert_object);
            console.log(input1);
        }).catch(function(err) {
            console.error(err.stack || err);
        });
        return this.getData();

    }

    // async open(ver, upgfunc) {

    // }

    // async close() {
    //     await this.dexieDB.close()
    // }

    // async delete() {
    //     await this.dexieDB.delete()
    // }

    // async transaction(trunstbls, func) {

    // }
}