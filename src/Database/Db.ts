import { IEventDb } from '../Context/Types';
const DataStore = require('nedb');

export default class Db {
    db : any;
    constructor() {
        this.db = new DataStore({ filename: 'C:/temp/huehuehue.db', autoload: true});
    }

    createEvent = (event: any) => {
        return new Promise<IEventDb>((resolve, reject) => {
            this.db.insert(event, function(err, docs) {
                if (docs) {
                    resolve(docs);
                }
                else {
                    reject(err);
                }
            });         
       });
    }

    upsertEvents = (events: Array<any>) => {
        return new Promise<IEventDb>((resolve, reject) => {
            events.map(x => {
                this.db.update({ _id: x._id }, x, { upsert: true }, function(err, docs) {
                    if (docs) {
                        resolve(docs);
                    }
                    else {
                        reject(err);
                    }
                });
            });      
       });
    }


    editEvent = (id: string, event: any) => {
        return new Promise<IEventDb>((resolve, reject) => {
            this.db.update({ _id: id }, event, function(err, docs) {
                if (docs) {
                    resolve(docs);
                }
                else {
                    reject(err);
                }
            })
        })
    }

    getEvent = () => {
       return new Promise((resolve, reject) => {
            this.db.find({}, function(err, docs) {
                if (docs) {
                    resolve(docs);
                }
                else {
                    reject(err);
                }
            });
       });
    }

    deleteEvent = (id : string) => {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: id }, function(err, numRemoved) {
                if (numRemoved) {
                    resolve();
                }
                else {
                    reject(err);
                }
            })
        })
    }
}
