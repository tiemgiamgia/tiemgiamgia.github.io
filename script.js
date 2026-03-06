let products=[]
let filtered=[]

let page=1
let perPage=24

async function loadProducts(){

for(let i=1;i<=25;i++){

const res = await fetch("https://shop.tiemgiamgia.com/index/"+i+".json")

const data = await res.json()

products = products.concat(data)

}

filtered = products

render()

}

function render(){

const start = (page-1)*perPage
const end = start+perPage

const list = filtered.slice(start,end)

const container = document.getElementById("products")

container.innerHTML=""

list.forEach(p=>{

container.innerHTML += `
<div class="card">

<a href="/${p.slug}/">

<img src="${p.image}">

<div>${p.title}</div>

<b>${p.price.toLocaleString()}đ</b>

</a>

</div>
`

})

document.getElementById("pageText").innerText = page

}

function prev(){

if(page>1){

page--

render()

}

}

function next(){

if(page*perPage<filtered.length){

page++

render()

}

}

document.getElementById("search").oninput=function(){

const q = this.value.toLowerCase()

filtered = products.filter(p=>

p.title.toLowerCase().includes(q)

)

page=1

render()

}

loadProducts()