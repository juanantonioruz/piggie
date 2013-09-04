goog.provide('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.protocols');
cljs.core.async.impl.ioc_helpers.FN_IDX = 0;
cljs.core.async.impl.ioc_helpers.STATE_IDX = 1;
cljs.core.async.impl.ioc_helpers.VALUE_IDX = 2;
cljs.core.async.impl.ioc_helpers.BINDINGS_IDX = 3;
cljs.core.async.impl.ioc_helpers.USER_START_IDX = 4;
cljs.core.async.impl.ioc_helpers.aset_object = (function aset_object(arr,idx,o){
return (arr[idx][o]);
});
cljs.core.async.impl.ioc_helpers.aget_object = (function aget_object(arr,idx){
return (arr[idx]);
});
/**
* Returns true if the machine is in a finished state
*/
cljs.core.async.impl.ioc_helpers.finished_QMARK_ = (function finished_QMARK_(state_array){
return ((state_array[cljs.core.async.impl.ioc_helpers.STATE_IDX]) === "\uFDD0:finished");
});
cljs.core.async.impl.ioc_helpers.fn_handler = (function fn_handler(f){
if(typeof cljs.core.async.impl.ioc_helpers.t9807 !== 'undefined')
{} else
{goog.provide('cljs.core.async.impl.ioc_helpers.t9807');

/**
* @constructor
*/
cljs.core.async.impl.ioc_helpers.t9807 = (function (f,fn_handler,meta9808){
this.f = f;
this.fn_handler = fn_handler;
this.meta9808 = meta9808;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.impl.ioc_helpers.t9807.cljs$lang$type = true;
cljs.core.async.impl.ioc_helpers.t9807.cljs$lang$ctorStr = "cljs.core.async.impl.ioc-helpers/t9807";
cljs.core.async.impl.ioc_helpers.t9807.cljs$lang$ctorPrWriter = (function (this__4907__auto__,writer__4908__auto__,opt__4909__auto__){
return cljs.core._write.call(null,writer__4908__auto__,"cljs.core.async.impl.ioc-helpers/t9807");
});
cljs.core.async.impl.ioc_helpers.t9807.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.impl.ioc_helpers.t9807.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
return true;
});
cljs.core.async.impl.ioc_helpers.t9807.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
return self__.f;
});
cljs.core.async.impl.ioc_helpers.t9807.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9809){
var self__ = this;
return self__.meta9808;
});
cljs.core.async.impl.ioc_helpers.t9807.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9809,meta9808__$1){
var self__ = this;
return (new cljs.core.async.impl.ioc_helpers.t9807(self__.f,self__.fn_handler,meta9808__$1));
});
cljs.core.async.impl.ioc_helpers.__GT_t9807 = (function __GT_t9807(f__$1,fn_handler__$1,meta9808){
return (new cljs.core.async.impl.ioc_helpers.t9807(f__$1,fn_handler__$1,meta9808));
});
}
return (new cljs.core.async.impl.ioc_helpers.t9807(f,fn_handler,null));
});
cljs.core.async.impl.ioc_helpers.run_state_machine = (function run_state_machine(state){
return cljs.core.async.impl.ioc_helpers.aget_object.call(null,state,cljs.core.async.impl.ioc_helpers.FN_IDX).call(null,state);
});
cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped = (function run_state_machine_wrapped(state){
try{return cljs.core.async.impl.ioc_helpers.run_state_machine.call(null,state);
}catch (e9811){if((e9811 instanceof Object))
{var ex = e9811;
cljs.core.async.impl.protocols.close_BANG_.call(null,cljs.core.async.impl.ioc_helpers.aget_object.call(null,state,cljs.core.async.impl.ioc_helpers.USER_START_IDX));
throw ex;
} else
{if("\uFDD0:else")
{throw e9811;
} else
{return null;
}
}
}});
cljs.core.async.impl.ioc_helpers.take_BANG_ = (function take_BANG_(state,blk,c){
var temp__4098__auto__ = cljs.core.async.impl.protocols.take_BANG_.call(null,c,cljs.core.async.impl.ioc_helpers.fn_handler.call(null,(function (x){
var statearr_9814_9816 = state;
(statearr_9814_9816[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = x);
(statearr_9814_9816[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
})));
if(cljs.core.truth_(temp__4098__auto__))
{var cb = temp__4098__auto__;
var statearr_9815_9817 = state;
(statearr_9815_9817[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));
(statearr_9815_9817[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return "\uFDD0:recur";
} else
{return null;
}
});
cljs.core.async.impl.ioc_helpers.put_BANG_ = (function put_BANG_(state,blk,c,val){
var temp__4098__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,c,val,cljs.core.async.impl.ioc_helpers.fn_handler.call(null,(function (){
var statearr_9820_9822 = state;
(statearr_9820_9822[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = null);
(statearr_9820_9822[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
})));
if(cljs.core.truth_(temp__4098__auto__))
{var cb = temp__4098__auto__;
var statearr_9821_9823 = state;
(statearr_9821_9823[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));
(statearr_9821_9823[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return "\uFDD0:recur";
} else
{return null;
}
});
/**
* @param {...*} var_args
*/
cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_ = (function() { 
var ioc_alts_BANG___delegate = function (state,cont_block,ports,p__9824){
var map__9829 = p__9824;
var map__9829__$1 = ((cljs.core.seq_QMARK_.call(null,map__9829))?cljs.core.apply.call(null,cljs.core.hash_map,map__9829):map__9829);
var opts = map__9829__$1;
var statearr_9830_9833 = state;
(statearr_9830_9833[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);
var temp__4100__auto__ = cljs.core.async.do_alts.call(null,(function (val){
var statearr_9831_9834 = state;
(statearr_9831_9834[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
}),ports,opts);
if(cljs.core.truth_(temp__4100__auto__))
{var cb = temp__4100__auto__;
var statearr_9832_9835 = state;
(statearr_9832_9835[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));
return "\uFDD0:recur";
} else
{return null;
}
};
var ioc_alts_BANG_ = function (state,cont_block,ports,var_args){
var p__9824 = null;
if (arguments.length > 3) {
  p__9824 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return ioc_alts_BANG___delegate.call(this, state, cont_block, ports, p__9824);
};
ioc_alts_BANG_.cljs$lang$maxFixedArity = 3;
ioc_alts_BANG_.cljs$lang$applyTo = (function (arglist__9836){
var state = cljs.core.first(arglist__9836);
arglist__9836 = cljs.core.next(arglist__9836);
var cont_block = cljs.core.first(arglist__9836);
arglist__9836 = cljs.core.next(arglist__9836);
var ports = cljs.core.first(arglist__9836);
var p__9824 = cljs.core.rest(arglist__9836);
return ioc_alts_BANG___delegate(state, cont_block, ports, p__9824);
});
ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = ioc_alts_BANG___delegate;
return ioc_alts_BANG_;
})()
;
cljs.core.async.impl.ioc_helpers.return_chan = (function return_chan(state,value){
var c = (state[cljs.core.async.impl.ioc_helpers.USER_START_IDX]);
if((value == null))
{} else
{cljs.core.async.impl.protocols.put_BANG_.call(null,c,value,cljs.core.async.impl.ioc_helpers.fn_handler.call(null,(function (){
return null;
})));
}
cljs.core.async.impl.protocols.close_BANG_.call(null,c);
return c;
});
