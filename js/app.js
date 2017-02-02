$(function () {

    var model = {

        currentValueDisplay: 0,

        init: function () {
            if (!localStorage.memoryCalc) {
                localStorage.memoryCalc = JSON.stringify([]);
            }
        },
        saveMemory: function (val) {
            console.log("val", val);
            localStorage.memoryCalc = JSON.stringify(val);
        },
        getMemory: function () {
            return JSON.parse(localStorage.memoryCalc);
        }
    };


    var controller = {

        saveMemory: function (valor) {

            model.save(valor);
        },

        getMemory: function () {

            return model.getMemory;
        },

        setCurrentValueDisplay: function (value) {

            model.currentValueDisplay = value;
        },

        getCurrentValueDisplay: function () {

            return model.currentValueDisplay;
        },

        clearCurrentValueDisplay: function () {
           
            model.currentValueDisplay = 0;
            view.render();
        },

        recoverMemory: function () {
            var memory;
            memory = model.getMemory();
            
            controller.setCurrentValueDisplay(memory);
            view.render();
        },

        sumMemory: function (val) {
            var memory;
            
            memory = model.getMemory() + val;
            model.saveMemory(memory);

        },

        subMemory: function (val) {
            var memory;
            memory = model.getMemory() - val;
            model.saveMemory(memory);

        },

        cleanMemory: function (val) {

            model.saveMemory(0);

        },

        result: function (expression) {

            var result, resultString;

            result = eval(expression);
            resultString = result.toString();
            controller.setCurrentValueDisplay(result);

            view.render();
        },


        init: function () {
            model.init();
            view.init();
        }
    };


    var view = {

        init: function () {
            var btn, btnResult, expression, i;

            this.btnList = document.getElementsByClassName("btn-number");
            this.btnRecoverMen = document.getElementById("btn-mrecover");
            this.btnClearMen = document.getElementById("btn-mclear");
            this.btnSubMen = document.getElementById("btn-msub");
            this.btnSumMen = document.getElementById("btn-msum");
            this.btnClear = document.getElementById("btn-clear");
            btnResult = document.getElementById("btn-result");


            for (i = 0; i < this.btnList.length; i++) {
                btn = this.btnList[i];

                btn.addEventListener('click', (function (btnCopy) {
                    return function () {
                        view.exibeValor(btnCopy);
                    }
                })(btn));
            }

            this.btnRecoverMen.addEventListener('click', function () {

                controller.recoverMemory();
            });

            this.btnClearMen.addEventListener('click', function () {

                controller.cleanMemory();
            });

            this.btnSumMen.addEventListener('click', function () {

                expression = controller.getCurrentValueDisplay();
                controller.sumMemory(expression);
            });

            this.btnSubMen.addEventListener('click', function () {

                expression = controller.getCurrentValueDisplay();
                controller.subMemory(expression);
            });

            this.btnClear.addEventListener('click', function () {
               
                controller.clearCurrentValueDisplay();
            });

            btnResult.addEventListener('click', function () {

                expression = controller.getCurrentValueDisplay();
                controller.result(expression);
            });


            view.render();
        },

        exibeValor: function (button) {
            var val, expr, display;
            val = button.value;

            display = controller.getCurrentValueDisplay();
            console.log("getCurrent");
            console.log(display);

            expr = val;

            if (display !== 0) {
                expr = display + val;
            }

            controller.setCurrentValueDisplay(expr);
            view.render();
        },

        render: function () {
            this.display = document.getElementById('label-result');
            this.display.value = controller.getCurrentValueDisplay();
        }
    };

    controller.init();
});
