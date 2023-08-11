
const http =require ('http')
const fs = require ('fs')
const path = require('path')


const port =2626
const hostname = "localhost"

const ItemsDB = path.join(__dirname,'Inventory','items.json')

// This is the request and Response Handler
function requestHandler(req,res){
        if(req.url === '/v1/items'&& req.method ==="GET"){
            getAllItems(req,res)
        }
        else if (req.url ==='/items' && req.method==="GET"){
                getOneItem(req,res)
        }
        else if(req.url === '/v1/items'&& req.method ==="POST"){
            createNewItem(req,res)
        }
        else if(req.url === '/v1/items'&& req.method ==="PUT"){
            updateItem(req,res)
        }
        else if(req.url === '/v1/items'&& req.method ==="DELETE"){
            deleteItem(req,res)
        }
        // else if (req.url.startsWith('/items/') && req.method === 'GET') {
            // const itemId = req.url.slice(7); // Extract the item ID from the URL
            // getItem(req, res, itemId);
//         }
}



// Create a new Item in the Inventory DB
function createNewItem (req,res){
    const body =[]
    req.on("data",(chunk)=>{
        body.push(chunk)
    })
    
    req.on("end",()=>{
        const newItem =JSON.parse(body)
        newItem.id = Math.floor(Math.random() * 10)
        
        console.log(newItem)
        
        fs.readFile(ItemsDB,'utf-8',(err,items)=>{
            if (err){
                res.writeHead(401)
                res.end(err)
            }
            const oldItems =JSON.parse(items)
            const allItems =[...oldItems,newItem]

            fs.writeFile(ItemsDB,JSON.stringify(allItems),(err,data)=>{
                if(err){
                    res.writeHead(404)
                    res.end(`An error has occured ${err}`)
                }

                    res.writeHead(200)
                    res.end(JSON.stringify(newItem))
            })
        })
    })
}



// Get all Inventory Items
const getAllItems =function(req,res){
    fs.readFile(ItemsDB,'utf-8',(err,items)=>{
        if (err){
            res.writeHead(401)
            res.end(err)
        }
        res.writeHead(200)
        res.end(items)
    })
}



// Get one Inventory Items
function getOneItem(req,res){

    const itemObj =JSON.parse(items)
    const itemIndex = itemObj.findIndex(item => item.id ===itemId)

    if(itemIndex=== -1){
        res.writeHead(404)
        res.end("Item is not available in the Inventory Database")
    }
    if(itemIndex === 7){
       fs.readFile(ItemsDB,'utf-8',(err,items)=>{
        if(err){
            res.writeHead(404)
            res.end(err)
        }
        res.writeHead(200)
        res.end(item)
       })
            
    }
}
    

// Update an Item in the Inventoty DB
function updateItem (req,res){
    const body =[]
    req.on("data",(chunk)=>{
        body.push(chunk)
    })
    
    req.on("end",()=>{
        const newItem =JSON.parse(body)
        const itemId =newItem.id
        
        
        fs.readFile(ItemsDB,'utf-8',(err,items)=>{
            if (err){
                res.writeHead(401)
                res.end(err)
            }

            
            const itemObj =JSON.parse(items)
            const itemIndex = itemObj.findIndex(item => item.id ===itemId)

            if(itemIndex=== -1){
                res.writeHead(404)
                res.end("Item is not available in the Inventory Database")
            }

            const updateDB = {...itemObj[itemIndex],...newItem}
            itemObj[itemIndex]=updateDB


            fs.writeFile(ItemsDB,JSON.stringify(itemObj),(err,data)=>{
                if(err){
                    res.writeHead(404)
                    res.end(`An error has occured ${err}`)
                }

                    res.writeHead(200)
                    res.end("Item updated successfully")
            })
        })
    })
}




// Delete Item in the Inventory DB

function deleteItem (req,res){
    const body =[]
    req.on("data",(chunk)=>{
        body.push(chunk)
    })
    
    req.on("end",()=>{
        const newItem =JSON.parse(body)
        const itemId =newItem.id
        
        
        fs.readFile(ItemsDB,'utf-8',(err,items)=>{
            if (err){
                res.writeHead(401)
                res.end(err)
            }

            
            const itemObj =JSON.parse(items)
            const itemIndex = itemObj.findIndex(item => item.id ===itemId)

            if(itemIndex=== -1){
                res.writeHead(404)
                res.end("Item is not available in the Inventory Database")
            }

            itemObj.splice(itemIndex,1)


            fs.writeFile(ItemsDB,JSON.stringify(itemObj),(err,data)=>{
                if(err){
                    res.writeHead(404)
                    res.end(`An error has occured ${err}`)
                }

                    res.writeHead(200)
                    res.end("Item deleted successfully")
            })
        })
    })
}




// Creating a Server //
const server = http.createServer(requestHandler)

server.listen(port,hostname,()=>{
console.log('API Server is running successfully')
})