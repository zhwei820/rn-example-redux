import * as types from './actionTypes';
import Util from '../common/utils';

export let fetchProducts = ()=>{
    let URL = 'http://food.boohee.com/fb/v1/categories/list';

    return dispatch => {
        dispatch(fetchProductList());

        this._setLastRoundId(_last_round_id);
        this._setLastWeight(_last_weight);

        Util.get(URL, (response) => {
            proList = prepareProList(response['data']);

            dispatch(receiveProductList(response.data));
        }, (error) => {
            console.log('Fetch product list error: ' + error);
            dispatch(receiveProductList([]));
        });
    }
}

let fetchProductList = ()=> {
    return {
        type: types.FETCH_PRODUCT_LIST,
    }
}

let receiveProductList = (productList)=> {
    return {
        type: types.RECEIVE_PRODUCT_LIST,
        productList: productList,
    }
}


let prepareProList = (proList) => {
    let data = [];
    let item = [];
    let _last_round_id = 10000000;
    let _last_weight = 10000000;
    if(!proList){
      return [[], _last_round_id, _last_weight];
    }
    for (var i = 0; i < proList.length; i++) {
      if(_last_round_id > proList[i].roundId){
        _last_round_id = proList[i].roundId;
      }
      if(_last_weight > proList[i].weight){
        _last_weight = proList[i].weight;
      }
      if(i % 2 == 0 && i != proList.length - 1){
        item.push(proList[i]);
      }else if(i % 2 != 0) {
        item.push(proList[i]);
        data.push(item);
        item = [];
      }else if (i % 2 == 0 && i == proList.length - 1) {
        item.push(tmp[i]);
        item.push({});
        data.push(item);
      }
    }
    return [data, _last_round_id, _last_weight];
}
