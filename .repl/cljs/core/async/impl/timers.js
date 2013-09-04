goog.provide('cljs.core.async.impl.timers');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.protocols');
cljs.core.async.impl.timers.MAX_LEVEL = 15;
cljs.core.async.impl.timers.P = (1 / 2);
cljs.core.async.impl.timers.random_level = (function() {
var random_level = null;
var random_level__0 = (function (){
return random_level.call(null,0);
});
var random_level__1 = (function (level){
while(true){
if((function (){var and__3949__auto__ = (Math.random() < cljs.core.async.impl.timers.P);
if(and__3949__auto__)
{return (level < cljs.core.async.impl.timers.MAX_LEVEL);
} else
{return and__3949__auto__;
}
})())
{{
var G__9766 = (level + 1);
level = G__9766;
continue;
}
} else
{return level;
}
break;
}
});
random_level = function(level){
switch(arguments.length){
case 0:
return random_level__0.call(this);
case 1:
return random_level__1.call(this,level);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
random_level.cljs$core$IFn$_invoke$arity$0 = random_level__0;
random_level.cljs$core$IFn$_invoke$arity$1 = random_level__1;
return random_level;
})()
;
goog.provide('cljs.core.async.impl.timers.SkipListNode');

/**
* @constructor
*/
cljs.core.async.impl.timers.SkipListNode = (function (key,val,forward){
this.key = key;
this.val = val;
this.forward = forward;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2155872256;
})
cljs.core.async.impl.timers.SkipListNode.cljs$lang$type = true;
cljs.core.async.impl.timers.SkipListNode.cljs$lang$ctorStr = "cljs.core.async.impl.timers/SkipListNode";
cljs.core.async.impl.timers.SkipListNode.cljs$lang$ctorPrWriter = (function (this__4907__auto__,writer__4908__auto__,opt__4909__auto__){
return cljs.core._write.call(null,writer__4908__auto__,"cljs.core.async.impl.timers/SkipListNode");
});
cljs.core.async.impl.timers.SkipListNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"["," ","]",opts,coll);
});
cljs.core.async.impl.timers.SkipListNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var self__ = this;
return cljs.core.list.call(null,self__.key,self__.val);
});
cljs.core.async.impl.timers.__GT_SkipListNode = (function __GT_SkipListNode(key,val,forward){
return (new cljs.core.async.impl.timers.SkipListNode(key,val,forward));
});
cljs.core.async.impl.timers.skip_list_node = (function() {
var skip_list_node = null;
var skip_list_node__1 = (function (level){
return skip_list_node.call(null,null,null,level);
});
var skip_list_node__3 = (function (k,v,level){
var arr = (new Array((level + 1)));
var i_9767 = 0;
while(true){
if((i_9767 < arr.length))
{(arr[i_9767] = null);
{
var G__9768 = (i_9767 + 1);
i_9767 = G__9768;
continue;
}
} else
{}
break;
}
return (new cljs.core.async.impl.timers.SkipListNode(k,v,arr));
});
skip_list_node = function(k,v,level){
switch(arguments.length){
case 1:
return skip_list_node__1.call(this,k);
case 3:
return skip_list_node__3.call(this,k,v,level);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
skip_list_node.cljs$core$IFn$_invoke$arity$1 = skip_list_node__1;
skip_list_node.cljs$core$IFn$_invoke$arity$3 = skip_list_node__3;
return skip_list_node;
})()
;
cljs.core.async.impl.timers.least_greater_node = (function() {
var least_greater_node = null;
var least_greater_node__3 = (function (x,k,level){
return least_greater_node.call(null,x,k,level,null);
});
var least_greater_node__4 = (function (x,k,level,update){
while(true){
if(!((level < 0)))
{var x__$1 = (function (){var x__$1 = x;
while(true){
var temp__4098__auto__ = (x__$1.forward[level]);
if(cljs.core.truth_(temp__4098__auto__))
{var x_SINGLEQUOTE_ = temp__4098__auto__;
if((x_SINGLEQUOTE_.key < k))
{{
var G__9769 = x_SINGLEQUOTE_;
x__$1 = G__9769;
continue;
}
} else
{return x__$1;
}
} else
{return x__$1;
}
break;
}
})();
if((update == null))
{} else
{(update[level] = x__$1);
}
{
var G__9770 = x__$1;
var G__9771 = k;
var G__9772 = (level - 1);
var G__9773 = update;
x = G__9770;
k = G__9771;
level = G__9772;
update = G__9773;
continue;
}
} else
{return x;
}
break;
}
});
least_greater_node = function(x,k,level,update){
switch(arguments.length){
case 3:
return least_greater_node__3.call(this,x,k,level);
case 4:
return least_greater_node__4.call(this,x,k,level,update);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
least_greater_node.cljs$core$IFn$_invoke$arity$3 = least_greater_node__3;
least_greater_node.cljs$core$IFn$_invoke$arity$4 = least_greater_node__4;
return least_greater_node;
})()
;
goog.provide('cljs.core.async.impl.timers.SkipList');

/**
* @constructor
*/
cljs.core.async.impl.timers.SkipList = (function (header,level){
this.header = header;
this.level = level;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2155872256;
})
cljs.core.async.impl.timers.SkipList.cljs$lang$type = true;
cljs.core.async.impl.timers.SkipList.cljs$lang$ctorStr = "cljs.core.async.impl.timers/SkipList";
cljs.core.async.impl.timers.SkipList.cljs$lang$ctorPrWriter = (function (this__4907__auto__,writer__4908__auto__,opt__4909__auto__){
return cljs.core._write.call(null,writer__4908__auto__,"cljs.core.async.impl.timers/SkipList");
});
cljs.core.async.impl.timers.SkipList.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
var pr_pair = (function (keyval){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,""," ","",opts,keyval);
});
return cljs.core.pr_sequential_writer.call(null,writer,pr_pair,"{",", ","}",opts,coll);
});
cljs.core.async.impl.timers.SkipList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var self__ = this;
var iter = (function iter(node){
return (new cljs.core.LazySeq(null,false,(function (){
if((node == null))
{return null;
} else
{return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([node.key,node.val], true),iter.call(null,(node.forward[0])));
}
}),null));
});
return iter.call(null,(self__.header.forward[0]));
});
cljs.core.async.impl.timers.SkipList.prototype.put = (function (k,v){
var self__ = this;
var coll = this;
var update = (new Array(cljs.core.async.impl.timers.MAX_LEVEL));
var x = cljs.core.async.impl.timers.least_greater_node.call(null,self__.header,k,self__.level,update);
var x__$1 = (x.forward[0]);
if((function (){var and__3949__auto__ = !((x__$1 == null));
if(and__3949__auto__)
{return (x__$1.key === k);
} else
{return and__3949__auto__;
}
})())
{return x__$1.val = v;
} else
{var new_level = cljs.core.async.impl.timers.random_level.call(null);
if((new_level > self__.level))
{var i_9774 = (self__.level + 1);
while(true){
if((i_9774 <= (new_level + 1)))
{(update[i_9774] = self__.header);
{
var G__9775 = (i_9774 + 1);
i_9774 = G__9775;
continue;
}
} else
{}
break;
}
self__.level = new_level;
} else
{}
var x__$2 = cljs.core.async.impl.timers.skip_list_node.call(null,k,v,(new Array(new_level)));
var i = 0;
while(true){
if((i <= self__.level))
{var links = (update[i]).forward;
(x__$2.forward[i] = (links[i]));
return (links[i] = x__$2);
} else
{return null;
}
break;
}
}
});
cljs.core.async.impl.timers.SkipList.prototype.remove = (function (k){
var self__ = this;
var coll = this;
var update = (new Array(cljs.core.async.impl.timers.MAX_LEVEL));
var x = cljs.core.async.impl.timers.least_greater_node.call(null,self__.header,k,self__.level,update);
var x__$1 = (x.forward[0]);
if((function (){var and__3949__auto__ = !((x__$1 == null));
if(and__3949__auto__)
{return (x__$1.key === k);
} else
{return and__3949__auto__;
}
})())
{var i_9776 = 0;
while(true){
if((i_9776 <= self__.level))
{var links_9777 = (update[i_9776]).forward;
if(((links_9777[i_9776]) === x__$1))
{(links_9777[i_9776] = (x__$1.forward[i_9776]));
{
var G__9778 = (i_9776 + 1);
i_9776 = G__9778;
continue;
}
} else
{{
var G__9779 = (i_9776 + 1);
i_9776 = G__9779;
continue;
}
}
} else
{}
break;
}
while(true){
if((function (){var and__3949__auto__ = (self__.level > 0);
if(and__3949__auto__)
{return ((self__.header.forward[self__.level]) == null);
} else
{return and__3949__auto__;
}
})())
{self__.level = (self__.level - 1);
{
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
cljs.core.async.impl.timers.SkipList.prototype.ceilingEntry = (function (k){
var self__ = this;
var coll = this;
var x = self__.header;
var level__$1 = self__.level;
while(true){
if(!((level__$1 < 0)))
{var nx = (function (){var x__$1 = x;
while(true){
var x_SINGLEQUOTE_ = (x__$1.forward[level__$1]);
if((x_SINGLEQUOTE_ == null))
{return null;
} else
{if((x_SINGLEQUOTE_.key >= k))
{return x_SINGLEQUOTE_;
} else
{{
var G__9780 = x_SINGLEQUOTE_;
x__$1 = G__9780;
continue;
}
}
}
break;
}
})();
if(!((nx == null)))
{{
var G__9781 = nx;
var G__9782 = (level__$1 - 1);
x = G__9781;
level__$1 = G__9782;
continue;
}
} else
{{
var G__9783 = x;
var G__9784 = (level__$1 - 1);
x = G__9783;
level__$1 = G__9784;
continue;
}
}
} else
{if((x === self__.header))
{return null;
} else
{return x;
}
}
break;
}
});
cljs.core.async.impl.timers.SkipList.prototype.floorEntry = (function (k){
var self__ = this;
var coll = this;
var x = self__.header;
var level__$1 = self__.level;
while(true){
if(!((level__$1 < 0)))
{var nx = (function (){var x__$1 = x;
while(true){
var x_SINGLEQUOTE_ = (x__$1.forward[level__$1]);
if(!((x_SINGLEQUOTE_ == null)))
{if((x_SINGLEQUOTE_.key > k))
{return x__$1;
} else
{{
var G__9785 = x_SINGLEQUOTE_;
x__$1 = G__9785;
continue;
}
}
} else
{if((level__$1 === 0))
{return x__$1;
} else
{return null;
}
}
break;
}
})();
if(cljs.core.truth_(nx))
{{
var G__9786 = nx;
var G__9787 = (level__$1 - 1);
x = G__9786;
level__$1 = G__9787;
continue;
}
} else
{{
var G__9788 = x;
var G__9789 = (level__$1 - 1);
x = G__9788;
level__$1 = G__9789;
continue;
}
}
} else
{if((x === self__.header))
{return null;
} else
{return x;
}
}
break;
}
});
cljs.core.async.impl.timers.__GT_SkipList = (function __GT_SkipList(header,level){
return (new cljs.core.async.impl.timers.SkipList(header,level));
});
cljs.core.async.impl.timers.skip_list = (function skip_list(){
return (new cljs.core.async.impl.timers.SkipList(cljs.core.async.impl.timers.skip_list_node.call(null,0),0));
});
cljs.core.async.impl.timers.timeouts_map = cljs.core.async.impl.timers.skip_list.call(null);
cljs.core.async.impl.timers.TIMEOUT_RESOLUTION_MS = 10;
/**
* returns a channel that will close after msecs
*/
cljs.core.async.impl.timers.timeout = (function timeout(msecs){
var timeout__$1 = ((new Date()).valueOf() + msecs);
var me = cljs.core.async.impl.timers.timeouts_map.ceilingEntry(timeout__$1);
var or__3951__auto__ = (cljs.core.truth_((function (){var and__3949__auto__ = me;
if(cljs.core.truth_(and__3949__auto__))
{return (me.key < (timeout__$1 + cljs.core.async.impl.timers.TIMEOUT_RESOLUTION_MS));
} else
{return and__3949__auto__;
}
})())?me.val:null);
if(cljs.core.truth_(or__3951__auto__))
{return or__3951__auto__;
} else
{var timeout_channel = cljs.core.async.impl.channels.chan.call(null,null);
cljs.core.async.impl.timers.timeouts_map.put(timeout__$1,timeout_channel);
cljs.core.async.impl.dispatch.queue_delay.call(null,(function (){
cljs.core.async.impl.timers.timeouts_map.remove(timeout__$1);
return cljs.core.async.impl.protocols.close_BANG_.call(null,timeout_channel);
}),msecs);
return timeout_channel;
}
});
