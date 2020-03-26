import Dexie from 'dexie'

export class DBAccessCtrl {

    export async function store (userInfo) {
        this.dexieDB = new Dexie()
        console.log(this.dexieDB)
        this.dexieDB.version(1).stores({
            userData: '++, firstname, lastname, email, company, username, password'
        })
        this.dexieDB.userData.add(userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.company, userInfo.userName, userInfo.passowrd)
        const allUserInfo = await this.dexieDB.userData.toArray();
        console.log(allUserInfo)
    }

    async open(ver, upgfunc) {

    }

    async close() {
        await this.dexieDB.close()
    }

    async delete() {
        await this.dexieDB.delete()
    }

    async transaction(trunstbls, func) {

    }
}