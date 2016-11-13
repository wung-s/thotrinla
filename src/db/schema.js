import Realm from 'realm';

class Song extends Realm.Object { }
Song.schema = {
  name: 'Song',
  primaryKey: 'songNo',
  properties: {
    songNo: 'int',
    title: { type: 'string', default: '', indexed: true },
    stanzaCnt: 'int',
    firstStanza: { type: 'string', default: '' },
    secondStanza: { type: 'string', default: '' },
    thirdStanza: { type: 'string', default: '' },
    fourthStanza: { type: 'string', default: '' },
    fifthStanza: { type: 'string', default: '' },
    sixthStanza: { type: 'string', default: '' },
    chorus: { type: 'string', default: '' }
  }
};

class Favourite extends Realm.Object { }
Favourite.schema = {
  name: 'Favourite',
  primaryKey: 'songNo',
  properties: {
    songNo: 'int'
  }
};

class Setting extends Realm.Object { }
Setting.schema = {
  name: 'Setting',
  primaryKey: 'id',
  properties: {
    id: 'int',
    fontSize: { type: 'int', default: 16 }
  }
}

export default new Realm({ schema: [Song, Favourite, Setting] });
