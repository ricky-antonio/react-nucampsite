import { createStore, combineReducers } from 'redux';
import { Campsites } from './campsites';
import { Partners } from './partners';
import { Comments } from './comments';
import { Promotions } from './promotions';


export const ConfigureStore = () => {
    const store = createStore( 
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        })
    );

    return store;
}