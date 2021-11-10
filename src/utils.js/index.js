const simplifyData = (data) => {
    let groups = [];
    let sd = {};
    let prima = [];
    let grouped = [];
    data.map((item) => {
      if (item.category) {
        if (!groups.includes(item.category?.name)) {
          groups.push(item.category?.name);
          grouped.push({ category: item.category?.name, items: [], });
          let vh = item.category?.name;
          let miniItem = {...item, checked:false}
          sd[vh] = { items: [miniItem], selected:false };
        } else {
          let miniItem = {...item, checked:false}

          sd[item.category?.name].items = [
            ...sd[item.category?.name].items,
            miniItem,
          ];
        }
      } else {
        if (!groups.includes("unclassified")) {
          groups.push("unclassified");
          let miniItem = {...item, checked:false}

          sd["unclassified"] = { items: [miniItem], selected:false };
        } else {
          let miniItem = {...item, checked:false}

          sd["unclassified"].items = [...sd["unclassified"].items, miniItem];
        }
      }
    });
    groups.map((gp) => {
      prima.push({ category: gp, items: [...sd[gp].items], selected:sd[gp].selected });
    });
    return prima;
  };

  const watchSelected =(items)=>{
    let checked = []
    let unchecked = []
    let theItems = items.length
    items.map(item =>{
      if(item.checked){
        checked.push(item.id)
      }else{
        unchecked.push(item.id)
      }
      return null ;
    })
    return (unchecked.length === 0 && checked.length !== 0) ? true : false
  }

  const watchAllSelected =(data)=>{
    let checked = []
    let unchecked = []
    let theItems = data.length
    let getData = data
    getData.map((cat,i)=>{
      cat.items.map(item =>{
        if(item.checked){
          checked.push(item.id)
        }else{
          unchecked.push(item.id)
        }
        return null ;
      })

    })
    return (unchecked.length === 0 && checked.length !== 0) ? true : false
  }
  const selectAll = (data) => {
    let dcopy = data;
    let pickedItem = [];
   

      dcopy.map((cat,i)=>{
        // let tbm = dcopy[ci];
      let work = cat.items.map((item, i) => {
        item = { ...item, checked: true };
        pickedItem.push(item.id);
        return item;
      });
      dcopy[i].items = work;
      dcopy[i].selected = true;
    })
    // let newSelected = [...new Set([...state.applicable_items, ...pickedItem])]

    return {items:pickedItem, data:dcopy};
  };
  export {
      simplifyData,
      watchAllSelected,
      watchSelected,
      selectAll
  }