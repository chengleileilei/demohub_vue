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
        },
        Vue.prototype.fileChange = function(file_ref_name, image_url, loading_token) {
            console.log("public filechange was called!!!!")
            if (this.imageVerification(this.$refs[file_ref_name])) {
                this[loading_token] = true;
                this.$nextTick(() => {
                    const formData = new FormData();
                    formData.append("image", this.$refs[file_ref_name].files[0]);
                    this.$axios
                        .post(this.baseUrl + "upload", formData, {
                            "Content-type": "multipart/form-data",
                        })
                        .then(
                            (res) => {
                                // console.log(res.data);
                                this[image_url] = this.baseUrl + "absimage?path=" + res.data;
                            },
                            (err) => {
                                alert("上传图片失败！");
                                // 出现错误时的处理
                            }
                        )
                        .catch((err) => {
                            this.$message({
                                message: "上传图片失败！" + err,
                                type: "error",
                            });
                        });
                });
            } else {
                this.$message({
                    message: "图片校验失败！",
                    type: "warning",
                });
                // console.log("图片校验失败！");
            }
        }
}