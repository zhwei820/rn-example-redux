
    _onFetch = (page = 1, callback, options) => {
      console.log('gggggggggggggggggggggg');


     fetch("http://api.duo17.com/list_pro_common.do?uid=44248888&app_version=1.9.4.2&os_type=android&channel=share&last_round_id=0")
       .then((response) => response.json())
       .then((responseData) => {

         let data = [];
         let item = [];
         for (var i = 0; i < response.data.length; i++) {
           if(i % 2 == 0 && i != response.data.length - 1){
             item.push(response.data[i]);
           }else if(i % 2 != 0) {
             item.push(response.data[i]);
             data.push(item);
             item = [];
           }else if (i % 2 == 0 && i == response.data.length - 1) {
             item.push(tmp[i]);
             item.push({});
             data.push(item);
           }
         }
         console.log(data);
         console.log('dfdfdsfdsdfds');

         let rows = {};
         rows[page] = data;
         if (page === 100) {
           callback(rows, {
             allLoaded: true, // the end of the list is reached
           });
         } else {
           callback(rows);
         }

       })
       .done();
    }



    async function getRowData() {
      try {
        let response = await fetch('http://api.duo17.com/list_pro_common.do?uid=44248888&app_version=1.9.4.2&os_type=android&channel=share&last_round_id=0');
        let responseJson = await response.json();
        console.log('responseJsonresponseJsonresponseJsonresponseJsonresponseJsonresponseJsonresponseJson');
        console.log(responseJson);

        let data = [];
        let item = [];
        for (var i = 0; i < response.data.length; i++) {
          if(i % 2 == 0 && i != response.data.length - 1){
            item.push(response.data[i]);
          }else if(i % 2 != 0) {
            item.push(response.data[i]);
            data.push(item);
            item = [];
          }else if (i % 2 == 0 && i == response.data.length - 1) {
            item.push(tmp[i]);
            item.push({});
            data.push(item);
          }
        }
        console.log(data);

        return data;
      } catch(error) {
        // Handle error
        console.warn(error);
      }
    }
