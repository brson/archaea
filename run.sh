#! /bin/sh

FILES="bitwise box-unbox cast char clone-with-exterior comm complex dead-code-one-arm-if deep\
      div-mod drop-on-ret else-if export-non-interference exterior fact foreach-nested\
      foreach-put-structured foreach-simple-outer-slot fun-call-variants fun-indirect-call\
      generic-derived-type generic-drop-glue generic-exterior-box, generic-fn-infer\
      generic-fn generic-recursive-tag generic-tag generic-type generic-type-synonym\
      hello i32-sub i8-incr import inner-module int large-records lazy-and-or linear-for-loop\
      list mlist-cycle mlist mutable-vec-drop mutual-recursion-group opeq preempt\
      readalias rec-auto rec-extend rec rec-tup return-nil spawn-fn spawn str-append \
      str-concat str-idx tag tail-cps tail-direct threads tup type-sizes u32-decr\
      u8-incr-decr u8-incr uint utf8 vec-concat vec-drop vec vec-slice writealias\
      yield2 yield1"

python ~/dev/archaea/make_index.py $FILES > ~/dev/archaea/index.html

for file in $FILES
do
    python ~/dev/archaea/archaea.py src/test/run-pass/$file.rs > ~/dev/archaea/$file.html
done

