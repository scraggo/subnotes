"use strict";

function getTestString() {
    return "z title should be low\nsubnote below z title\n\n+Project1 @tag\n    x done item in project\n    task1 for project @!!!\n    x another done item in project\n    task2 for project\n    task3 for project\n    x 3rd done item in project\n\nNot a project, so it's a note\n    x done item for note\n    subnote with priority tag @!\n\nx Top level done item @innertag embedded tag\n\nx Top level done item with subnote\nsubnote1 for done header\nsubnote2 for done header\n\nx Top level done item with tag @!\n\nnote, no subnotes 1 lots of tags @! @tag @othertag @crazy\n\nnote, no subnotes 2\n\nNote with tag @!\n    x done item for note\n    not done item for a note @tag\n      ";
}

// console.log(getTestString());