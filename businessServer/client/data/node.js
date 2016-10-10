const node = [
{"id":2,"question":"caf or decaf?","productId":1, "layer":2, "topLevel":true,"createdAt":"2016-10-06T19:21:06.422Z","updatedAt":"2016-10-06T19:21:06.422Z","from":[{"id":3,"answer":"decaf","createdAt":"2016-10-06T19:21:06.458Z","updatedAt":"2016-10-06T19:21:06.458Z","fromId":2,"toId":3,"businessId":1},
{"id":2,"answer":"caf","createdAt":"2016-10-06T19:21:06.458Z","updatedAt":"2016-10-06T19:21:06.458Z","fromId":2,"toId":3,"businessId":1}],"to":[
  {"id":1,"answer":"coffee","createdAt":"2016-10-06T19:21:06.458Z","updatedAt":"2016-10-06T19:21:06.458Z","fromId":1,"toId":2,"businessId":1}
  ]
},
{"id":3,"question":"What size?","productId":1,"layer":2,"topLevel":true,"createdAt":"2016-10-06T19:21:06.422Z","updatedAt":"2016-10-06T19:21:06.422Z","from":[
  {"id":5,"answer":"medium","createdAt":"2016-10-06T19:21:06.458Z","updatedAt":"2016-10-06T19:21:06.458Z","fromId":3,"toId":4,"businessId":1},
{"id":4,"answer":"large","createdAt":"2016-10-06T19:21:06.458Z","updatedAt":"2016-10-06T19:21:06.458Z","fromId":3,"toId":4,"businessId":1}],"to":[
  {"id":2,"answer":"caf","createdAt":"2016-10-06T19:21:06.458Z","updatedAt":"2016-10-06T19:21:06.458Z","fromId":2,"toId":3,"businessId":1},
  {"id":3,"answer":"decaf","createdAt":"2016-10-06T19:21:06.458Z","updatedAt":"2016-10-06T19:21:06.458Z","fromId":2,"toId":3,"businessId":1}]
},
{"id":4,"question":"Anything else you can think of?","productId":1, "layer":2, "topLevel":true,"createdAt":"2016-10-06T19:21:06.422Z","updatedAt":"2016-10-06T19:21:06.422Z","from":[],"to":[
{"id":4,"answer":"large","createdAt":"2016-10-06T19:21:06.458Z","updatedAt":"2016-10-06T19:21:06.458Z","fromId":3,"toId":4,"businessId":1},
{"id":5,"answer":"medium","createdAt":"2016-10-06T19:21:06.458Z","updatedAt":"2016-10-06T19:21:06.458Z","fromId":3,"toId":4,"businessId":1}]}]

export default node;
