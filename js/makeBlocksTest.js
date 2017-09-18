
/*
EXPECTED OUTPUT
[['1some start', '2random end'], ['3stuff start', '4with end'], ['5random start/end'], ['6lines start/end'], ['7in start', '8certain', '9places end']]
*/

const test_text = `1some start
2random end

3stuff start
4with end


5random start/end

6lines start/end

7in start
8certain
9places end
`

function test_block_encoder() {
    let f_text = test_text;
    console.log(block_encoder(f_text));
}

function run_tests() {
    test_block_encoder();
}

run_tests();