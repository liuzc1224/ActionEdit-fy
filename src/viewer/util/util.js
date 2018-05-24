let util={
    searchInTree(data,name,match){
        var stack = [];
        stack.push(data);
        var tmpNode;
        while (stack.length > 0) {
            tmpNode = stack.pop();
            if(match.test(tmpNode[name])){
                return tmpNode;
            }
            if(!tmpNode.children)continue;
            for(let child of tmpNode.children){
                stack.push(child);
            }
        }
        // if(Object.prototype.toString.apply(data) === '[object Array]'){

        // }else{

        // }
    }
    
}

export default util;