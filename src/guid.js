let __guid = 1;

const GUID = {
  newGuid(){
    // console.log(__guid);
    return __guid++;
  }
}

export default GUID;