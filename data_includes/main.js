// Populate this area to include info etc.

PennController.ResetPrefix(null)
PennController.DebugOff();

// Define the sequence of blocks in the trial
Sequence("intro",
    "instructions",
    randomize("study"),
    "intermission",
    randomize("recall"),
    "debrief",
    SendResults(),
    "goodbye")

// Header at the beginning of each trial
Header(
    // use global variable element to store participants' name
    newVar("ParticipantName")
        .global()
    ,
    // delay of 500ms before every trial
    newTimer(500)
        .start()
        .wait()
)
// Log the participant
//.log("Name", getVar("ParticipantName"))
.log("ParticipantID", PennController.GetURLParameter("participant") );


newTrial("intro",

    newText("<p>Welcome!</p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p><strong>Informed Consent</strong>:</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p><strong>Voluntary participation:</strong> I understand that my participation in this study is voluntary.<br/>" +
        "<strong>Withdrawal:</strong> I can withdraw my participation at any time during the experiment.<br/>"+
        "<strong>Risks:</strong> There are no risks involved.<br/>"+
        "<strong>Equipment:</strong> I am participating from a device with a <strong>physical keyboard</strong>.<br/>"+
        "<strong>Environment:</strong> I participate from a quiet environment and can <strong>work uninterrupted</strong>.</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p>By hitting SPACE I consent to the above.")
        .css("font-family", "Verdana")
        .print()
    ,
    newKey(" ")
        .log()
        .once()
        .wait()
)


newTrial("instructions",

    newText("<p><strong>The memory experiment</strong></p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p>We want to test whether and how well people can memorise words. The experiment consists of two parts:</p>" +
        "<p>In the <strong>memory</strong> phase, you will see 30 words, one at a time, for 2 seconds each.<br/>"+
        "Your task in this phase is to look at the words and memorise them. <strong>DO NOT WRITE THEM DOWN.</strong></p>" +
        "<p>In the <strong>recall</strong> phase, you are shown 30 words. Your task is to decide,<br/>" +
        "as quickly and accurately as possible, whether you saw the word on the screen in the memory phase before.<br/>"+
        "(There will be instructions on how to do this before the recall task.)</p>" +
        "<p><strong>IMPORTANT (again): Please do not write the words down</strong>, we want to know about human memory.<br/>" +
        "(In fact, your response times will show whether you followed the instructions or not<br/>" +
        "because looking up words will take too long. However, we assume you are cooperative anyway.)</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p>Press SPACE to start the memory phase.</p>")
        .css("font-family", "Verdana")
        .print()
   ,
    newKey(" ")
    .log()
    .once()
    .wait()

)

Template("lg_study.csv", row =>
    newTrial("study",

        // set up a timer so there is a x ms break between trials
        newTimer(500)
            .start()
            .wait()
        ,
        // set up the prime
        newText("Word", row.Word)
            .css("font-size", "2em")
            .css("font-family", "Verdana")
            .center()
            .print()
        ,
        // how long the word is visible
        newTimer("wait", 2000)
            .start()
            .wait()
        ,
        getText("Word")
            .remove()
        ,
        // Set a 200ms break between
        newTimer(100)
            .start()
            .wait()
        ,
    )
// log info
        .log("Word", row.Word)
        .log("Phase", row.Phase)
        .log("Condition", row.Condition)
        .log("SeenBefore", row.SeenBefore)
        .log("Item", row.Item)
)

newTrial("intermission",
    newText("<p>That's it for the memory phase. Now comes the recall phase.</p>" +
    "<p>You will now see another 30 words. You will have to decide whether you have seen the word during the study phase.</p>"+
    "<p>Please indicate by using the <strong>F</strong> and <strong>K</strong> keys</p>" +
    "<p>Think <strong>F = false, not seen before</strong> and <strong>J = yes, seen before</strong></p>" +
    "<p>Please answer as quickly as possible, but try to be accurate also.</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p>Please put your index fingers on the <strong>F</strong> and <strong>J</strong> keys and SPACE when you are ready.</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newKey(" ")
        .log()
        .once()
        .wait()
)

Template("lg_recall.csv", row =>
    newTrial("recall",

        // set up a timer so there is a x ms break between trials
        newTimer(500)
            .start()
            .wait()
        ,
        // Now show target
        newText("Word", row.Word)
            .css("font-size", "2em")
            .css("font-family", "Verdana")
            .center()
            .print()
            .log()
        ,
        // set up the response buttons
        newKey("FJ")
            .log()
            .once()
            .wait()
     )
        // log info
        .log("Word", row.Word)
        .log("Phase", row.Phase)
        .log("Condition", row.Condition)
        .log("SeenBefore", row.SeenBefore)
        .log("Item", row.Item)
)

newTrial("debrief",

    newText("<p>That's (almost) it, thank you!</p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p>Before you go, would you mind providing us with feedback?<br/>" +
        "This is voluntary, but will help us with the analysis.</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p><strong>What do you think the experiment was about?<br/>Anything else you'd like to tell us about your experience?</strong></p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newTextInput("topic", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(400, 100)
        .css("font-family", "Verdana")
        .print()
        .log()
    ,
    newText("<p><strong>Did you read the words out loud in the memory phase?</strong></p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newScale("read", "yes", "sometimes", "no", "can't remember", "rather not say")
        .css("font-family", "Verdana")
        .settings.vertical()
        .print()
        .log()
    ,
    newText("<p> </p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newButton("send", "Send results & proceed to verification link")
        .size(300)
        .print()
        .wait()
)
// now send results before the good-bye and validation message
SendResults()

newTrial("goodbye",
    newText("<p>That's it, thank you very much for your time and effort!</p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p><strong>Our feedback</strong>: Some of the unseen words in the recall phase were closer in meaning to words in the<br/>"+
        "memory phase than others. We want to know whether semantic relatedness leads to quicker and more correct answers.</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<strong><a href='https://app.prolific.co/submissions/complete?cc=8B2C141F'>Click here to return to Prolific to validate your participation.</a></strong>")
        .css("font-size", "1em")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p><br/>You can contact the corresponding researcher <a href='https://www.sfla.ch/' target='_blank'>here</a> (opens new tab).</p>")
        .css("font-size", ".8em")
        .css("font-family", "Verdana")
        .print()
    ,
    newButton("void")
        .wait()
) // the good-bye message


// Define additional functions:
    .setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial

// Function to include a break after 30 trials
function SepWithN(sep, main, n) {
    this.args = [sep,main];

    this.run = function(arrays) {
        assert(arrays.length == 2, "Wrong number of arguments (or bad argument) to SepWithN");
        assert(parseInt(n) > 0, "N must be a positive number");
        let sep = arrays[0];
        let main = arrays[1];

        if (main.length <= 1)
            return main
        else {
            let newArray = [];
            while (main.length){
                for (let i = 0; i < n && main.length>0; i++)
                    newArray.push(main.pop());
                for (let j = 0; j < sep.length; ++j)
                    newArray.push(sep[j]);
            }
            return newArray;
        }
    }
}
function sepWithN(sep, main, n) { return new SepWithN(sep, main, n); }

_AddStandardCommands(function(PennEngine){
    this.test = {
        passed: function(){
            return !PennEngine.controllers.running.utils.valuesForNextElement ||
                !PennEngine.controllers.running.utils.valuesForNextElement.failed
        }
    }
});