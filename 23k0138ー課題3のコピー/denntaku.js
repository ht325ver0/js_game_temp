var num0 = [];
let sumlist = [];
alert('A');

function addNum0(num) {
    num0.push(num);
}

function plu(num){
	var str = num.join('');
	let ele = Number(str);
	sumlist.push(ele);
	alert(`数字は${ele}です。`);
	num0.splice(0,num0.length);
}

function sum(lis){
	let total = lis.reduce((sum,element) => sum + element,0);
	alert(`「${sumlist}」これを足します。`);
	alert(`合計は${total}です`);

}

for (let i = 0; i <= 11; i++) {
    let btn = document.getElementById(`bt${i}`);
    if (i == 10){
		btn.addEventListener('click',() => plu(num0));
	} else if (i ==11){
		btn.addEventListener('click',() => plu(num0));
		btn.addEventListener('click',() => sum(sumlist));
	} else{
		btn.addEventListener('click',() => addNum0(i));
	}
}
