exports.install = function(Vue, options) {
    Vue.prototype.imageVerification = function(file) {
            /*判断文件后缀类型*/
            var strs = new Array(); //定义一数组
            var pic1 = file.value; //获取input框的值，文件路径
            strs = pic1.split("."); //分成数组存储
            var suffix = strs[strs.length - 1]; //获取文件后缀
            suffix = suffix.toLowerCase();

            if (
                suffix != "jpg" &&
                suffix != "gif" &&
                suffix != "jpeg" &&
                suffix != "png"
            ) {
                alert("仅支持jpg、jpeg、gif格式图片！"); //不是图片，做处理
                return false;
            }
            var fileSize = 0; //文件大小默认为0
            /*获取文件大小，以Kb为单位*/
            fileSize = file.files[0].size / 1024;
            if (fileSize > 10000) {
                alert("您选择的图片太大，请选择小于10M的图片");
                return flase;
            } else {
                return true;
            }
        }
        // ,
        // Vue.prototype.imageClear = function() {
        //     (this.imageUrl = ""), (this.$refs.filebutton.value = "");
        //     this.isLoading = false;
        //     this.isLoading2 = false;
        //     this.modelResult = "";
        //     this.falseShow = false;
        // }
}