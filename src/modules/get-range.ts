const getRange = (range:string) => {
    if(range.includes('-') === false)
      throw new Error('Invalid IP Range, e.g(192.168.1.1-254)')
    if(!range)
      throw new Error('IP Range cannot be null, e.g(192.168.1.1-254)')
    var array = []
    let network = range.split('-')[0]
    var max = range.split('-')[1]
    if(Number(max)> 255)
      throw new Error('Invalid IP Range, e.g(192.168.1.1-254)')
    const min = network.split('.')[3]
    network = network.replace(new RegExp(min + '$'), '');
    for (var i = Number(min); i <= Number(max); i++) {
      const node = network.concat(i.toString());
      array.push(node);
    }
    return array;
};

export { getRange };
