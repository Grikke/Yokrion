Object.prototype.forEach = function(func) {
    Object.keys(this).forEach(key => {
        func(key, this[key])
    })
}
Object.prototype.count = function() {
    return Object.keys(this).length
}
Object.prototype.getFirstKey = function() {
    return Object.keys(this)[0]
}