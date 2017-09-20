"use strict";

/*
EXPECTED OUTPUT
[['1some start', '2random end'], ['3stuff start', '4with end'], ['5random start/end'], ['6lines start/end'], ['7in start', '8certain', '9places end']]
*/

var test_text = "1some start\n2random end\n\n3stuff start\n4with end\n\n\n5random start/end\n\n6lines start/end\n\n7in start\n8certain\n9places end\n";

function test_block_encoder() {
    var f_text = test_text;
    console.log(block_encoder(f_text));
}

function run_tests() {
    test_block_encoder();
}

run_tests();