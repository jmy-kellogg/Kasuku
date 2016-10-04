-> notes front end needs to provide

$ new product (special connection)
    -> business
    Connection.create(fromId = headNodeId)
new question node (pertaining to a product)
    ASSUMING TAIL NODE ADDITION!
    -> pointing connection ids, question
    node = Node.create(question)
    apply these connections to point to this node
    connection.toId = node.id
add connection to an exisiting node
    Connection.create(answer: frontEnd, fromId: nodeIdFE, toId???)
$ new business
    node.create(headNode)
    business.create(name, headNode.id)
? create head node for a business
    add base node, link to that as headNodeId
new chatter 
    chatter.create(name, other shit)


1. each connection is created under the assumption it is a leaf (toId = Null) unless that special case
2. On Node N creation, all answers to N must be specified and set
3. Products are connections where fromId points to a headNode
4. HeadNodes are not pointed to from fromIds!

most straightforward routes
- create products
- create node for a product 



FIRST 
-- assume literal answer matching
-- navigate to leaf node
-- keep track of chatter
-- mimic chatting behavior through command prompt? api? fsg?



given 
 -> Specific chatter, specific business, new message
do
 -> calculate products



conversation table holds running total
if collection line has a price associated, add that to the conversation total
need to keep track of the product's specs

checkout time
 -> all specific products with correct variations
 -> total checkout
 -> shipping address?


 Routes:

 create a business
 create a node
 create a connection (product)

 read a business
 read a node
 read all nodes of particular business
 read a connection
 read all connects of a particular node
