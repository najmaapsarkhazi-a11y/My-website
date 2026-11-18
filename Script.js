// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open and close the mobile menu
menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});

// Close mobile menu after selecting a link
navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// Close menu after selecting a navigation link

const navigationItems = document.querySelectorAll(".nav-links a");

navigationItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});


// Welcome message in browser console

console.log("Welcome to Beyond the Screen!");
console.log("Every story deserves to be understood.");



/* =================================
   BEYOND THE SCREEN
   STORY 01: THE SILENT CLASSMATE
   BRANCHING STORY ENGINE
================================= */

const storyModal = document.getElementById("storyModal");
const storyContent = document.getElementById("storyContent");
const closeStory = document.getElementById("closeStory");

let currentScene = "start";
let selectedEnding = "";

// All story scenes and choices
const silentClassmateStory = {

    start: {
        title: "Some silences have stories.",
        text: `
            <p>You are in a university classroom. There is a student
            who always sits alone, rarely speaks, and never joins
            group discussions.</p>

            <p>Today, your teacher asks everyone to form groups.
            Once again, this student remains alone.</p>

            <p><strong>What would you do?</strong></p>
        `,
        choices: [
            {
                text: "Invite them to join your group.",
                next: "inviteResponse"
            },
            {
                text: "Ask your friend what they think.",
                next: "friendResponse"
            },
            {
                text: "Continue with your own group.",
                next: "afterClass"
            }
        ]
    },

    inviteResponse: {
        title: "A hesitant response",
        text: `
            <p>You walk over and ask if they would like to join
            your group.</p>

            <p>They look surprised and quietly reply:</p>

            <p><em>"Maybe... I'm not sure if I'll fit in."</em></p>

            <p>How would you respond?</p>
        `,
        choices: [
            {
                text: "Tell them they can participate at their own pace.",
                next: "supportEnding"
            },
            {
                text: "Tell them they need to speak up if they join.",
                next: "pressureEnding"
            }
        ]
    },

    friendResponse: {
        title: "A friend's assumption",
        text: `
            <p>You ask your friend about the quiet classmate.</p>

            <p>Your friend says:</p>

            <p><em>"They never talk. Maybe they don't want
            to make friends."</em></p>

            <p>What would you say?</p>
        `,
        choices: [
            {
                text: "Maybe we should ask instead of assuming.",
                next: "supportEnding"
            },
            {
                text: "Maybe you're right. Let's leave them alone.",
                next: "afterClass"
            }
        ]
    },

    afterClass: {
        title: "After the class",
        text: `
            <p>The class ends. Everyone begins packing their bags.
            You notice the student sitting alone again.</p>

            <p>For a moment, you wonder whether they might
            appreciate someone checking in.</p>

            <p>What will you do?</p>
        `,
        choices: [
            {
                text: "Go over and ask how they are doing.",
                next: "supportEnding"
            },
            {
                text: "Leave without saying anything.",
                next: "quietEnding"
            }
        ]
    },

    supportEnding: {
        ending: true,
        title: "A small moment of kindness",
        text: `
            <p>You make space for the student without expecting
            them to become someone different.</p>

            <p>They slowly begin to feel more comfortable.
            Perhaps this is the beginning of a friendship.
            Perhaps it is simply one moment in which they
            felt included.</p>

            <p>Sometimes, a small act of kindness matters.</p>
        `
    },

    pressureEnding: {
        ending: true,
        title: "Good intentions, different impact",
        text: `
            <p>You wanted to include the student, but your words
            made them feel that they had to prove themselves
            before being accepted.</p>

            <p>They become quieter and decide not to join
            the discussion.</p>

            <p>Sometimes, even when our intentions are good,
            we need to think about how our words may feel
            to someone else.</p>
        `
    },

    quietEnding: {
        ending: true,
        title: "The moment that passed",
        text: `
            <p>You leave the classroom and continue with your day.</p>

            <p>The student remains alone. You may never know
            what they were going through or whether they
            wanted someone to talk to.</p>

            <p>Not every moment gives us the full picture.
            Sometimes, we can choose to be a little more curious
            and a little less certain.</p>
        `
    }

};


// Open the story
document.querySelectorAll('[data-story="silent"]').forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();
        openSilentStory();

    });

});


function openSilentStory() {

    currentScene = "start";
    selectedEnding = "";

    storyModal.classList.add("active");
    storyModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    showScene();

}


// Display the current scene
function showScene() {

    const scene = silentClassmateStory[currentScene];

    storyContent.innerHTML = `

        <div class="story-progress">
            <div class="story-progress-fill"
                style="width: ${scene.ending ? "70" : "45"}%">
            </div>
        </div>

        <h2>${scene.title}</h2>

        ${scene.text}

        ${
            scene.ending
            ? `
                <button class="story-next" id="revealButton">
                    See it from their side →
                </button>
              `
            : `
                <div class="story-choices">
                    ${scene.choices.map((choice, index) => `
                        <button class="story-choice"
                            data-next="${choice.next}">
                            ${choice.text}
                        </button>
                    `).join("")}
                </div>
              `
        }

    `;


    // Connect the choice buttons
    document.querySelectorAll("[data-next]").forEach(button => {

        button.addEventListener("click", function() {

            currentScene = this.dataset.next;

            if (silentClassmateStory[currentScene].ending) {
                selectedEnding = currentScene;
            }

            showScene();

        });

    });


    // Connect the perspective reveal button
    const revealButton = document.getElementById("revealButton");

    if (revealButton) {
        revealButton.addEventListener("click", showHiddenPerspective);
    }

}


// Reveal the hidden perspective
function showHiddenPerspective() {

    storyContent.innerHTML = `

        <div class="story-progress">
            <div class="story-progress-fill" style="width: 85%"></div>
        </div>

        <h2>See it from their side.</h2>

        <div class="story-reveal">

            <h3>The story behind the silence</h3>

            <p>
                What you didn't know was that this student had
                recently moved to a new city. Their family was
                far away, and adjusting to a new environment
                had not been easy.
            </p>

            <p>
                They wanted to make friends but were afraid
                of being judged for their silence, their accent,
                and their unfamiliarity with the environment.
            </p>

            <p>
                Their silence was not a sign of arrogance.
                It was one part of a much bigger story.
            </p>

            <p><em>This is one possible story, not an explanation
            for every quiet person.</em></p>

        </div>

        <p>
            What we see is only a small part of what
            someone may be experiencing.
        </p>

        <button class="story-next" id="reflectButton">
            Reflect on this story →
        </button>

    `;

    document.getElementById("reflectButton").addEventListener(
        "click",
        showReflection
    );

}


// Reflection screen
function showReflection() {

    storyContent.innerHTML = `

        <div class="story-progress">
            <div class="story-progress-fill" style="width: 95%"></div>
        </div>

        <h2>A moment to reflect.</h2>

        <p>
            Did your choices change after discovering
            the hidden story?
        </p>

        <div class="story-reflection">

            <label for="reflectionAnswer">
                Write your thoughts:
            </label>

            <textarea
                id="reflectionAnswer"
                placeholder="I learned that..."
            ></textarea>

        </div>

        <button class="story-next" id="finishStory">
            Complete story ✓
        </button>

    `;

    document.getElementById("finishStory").addEventListener(
        "click",
        completeStory
    );

}


// Save progress and complete the story
function completeStory() {

    const answer = document.getElementById("reflectionAnswer").value;

    localStorage.setItem("silentClassmateCompleted", "true");

    localStorage.setItem("silentClassmateEnding", selectedEnding);

    localStorage.setItem("silentClassmateReflection", answer);

    updateMyJourney();

    storyContent.innerHTML = `

        <h2>Thank you for looking beyond. 🤍</h2>

        <p>You have completed your first Beyond the Screen story.</p>

        <div class="story-reveal">

            <h3>Remember this:</h3>

            <p>
                Everyone has a story we cannot see.
                A little understanding can make a big difference.
            </p>

        </div>

        <button class="story-next" id="replayStory">
            Replay story ↻
        </button>

        <button class="story-choice" id="finishButton">
            Return to homepage
        </button>

    `;

    document.getElementById("replayStory").addEventListener(
        "click",
        openSilentStory
    );

    document.getElementById("finishButton").addEventListener(
        "click",
        closeStoryWindow
    );

}


function closeStoryWindow() {

    storyModal.classList.remove("active");
    storyModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    updateStoryProgress();

}


closeStory.addEventListener("click", closeStoryWindow);


// Close when clicking outside the story box
storyModal.addEventListener("click", function(event) {

    if (event.target === storyModal) {
        closeStoryWindow();
    }

});



/* =================================
   MY JOURNEY - STORY PROGRESS
================================= */

function updateStoryProgress() {

    const stories = [
        {
            link: '[data-story="silent"]',
            statusId: "silentStoryStatus",
            storageKey: "silentClassmateCompleted"
        },
        {
            link: '[data-story="call"]',
            statusId: "callStoryStatus",
            storageKey: "unansweredCallCompleted"
        },
        {
            link: '[data-story="new-student"]',
            statusId: "newStudentStoryStatus",
            storageKey: "newStudentCompleted"
        }
    ];

    stories.forEach(story => {

        const storyLink = document.querySelector(story.link);

        if (!storyLink) return;

        let status = document.getElementById(story.statusId);

        if (!status) {

            status = document.createElement("p");

            status.id = story.statusId;
            status.className = "story-status";

            storyLink.insertAdjacentElement("afterend", status);

        }

        const completed = localStorage.getItem(story.storageKey);

        status.textContent = completed === "true"
            ? "✓ Story completed"
            : "Not completed yet";

    });

}

// Check progress when the page loads
updateStoryProgress();


/* =================================
   STORY 02: THE UNANSWERED CALL
================================= */

let unansweredCurrentScene = "start";
let unansweredEnding = "";

const unansweredCallStory = {

    start: {
        title: "The call you didn't answer.",
        text: `
            <p>Your phone lights up. Someone important to you
            is calling.</p>

            <p>You're busy, tired, and not really in the mood
            to talk. You let the phone ring until it stops.</p>

            <p>A few minutes later, you see the missed call.</p>

            <p><strong>What would you do?</strong></p>
        `,
        choices: [
            {
                text: "Call them back immediately.",
                next: "callback"
            },
            {
                text: "Send a short message asking what's wrong.",
                next: "message"
            },
            {
                text: "Ignore it. They can call again.",
                next: "ignore"
            }
        ]
    },

    callback: {
        title: "A familiar voice",
        text: `
            <p>You call back. After a few rings, they answer.</p>

            <p>"I just wanted to hear your voice," they say.</p>

            <p>You realize they sound a little different today.</p>

            <p>What would you say?</p>
        `,
        choices: [
            {
                text: "Ask if everything is okay.",
                next: "supportEnding"
            },
            {
                text: "Say you're busy and end the call.",
                next: "distantEnding"
            }
        ]
    },

    message: {
        title: "A message instead",
        text: `
            <p>You send a message: "Hey, what's up?
            I missed your call."</p>

            <p>They reply:</p>

            <p><em>"Nothing much. I just wanted to talk."</em></p>

            <p>You pause. Maybe they needed someone
            to listen today.</p>

            <p>What would you do?</p>
        `,
        choices: [
            {
                text: "Make some time to talk.",
                next: "supportEnding"
            },
            {
                text: "Reply that you'll talk another day.",
                next: "distantEnding"
            }
        ]
    },

    ignore: {
        title: "The silence continues",
        text: `
            <p>You put your phone aside and continue
            with your day.</p>

            <p>Hours pass. There are no more calls
            or messages.</p>

            <p>Later, you wonder whether you should
            have checked in.</p>

            <p>What would you do now?</p>
        `,
        choices: [
            {
                text: "Call them and ask how they are.",
                next: "supportEnding"
            },
            {
                text: "Wait for them to contact you again.",
                next: "distantEnding"
            }
        ]
    },

    supportEnding: {
        ending: true,
        title: "You made time to listen.",
        text: `
            <p>You take a moment to listen without rushing
            the conversation.</p>

            <p>They tell you they have been feeling lonely
            and missing the people they love.</p>

            <p>You may not have solved anything, but
            your willingness to listen mattered.</p>

            <p>Sometimes, being present is enough.</p>
        `
    },

    distantEnding: {
        ending: true,
        title: "A conversation postponed.",
        text: `
            <p>You decide to continue with your day.
            The conversation ends before it really begins.</p>

            <p>Perhaps they understand that you're busy.
            Perhaps they feel a little disappointed.</p>

            <p>You cannot know exactly how someone feels
            without giving them the chance to tell you.</p>
        `
    }
};


// Open The Unanswered Call
document.querySelectorAll('[data-story="call"]').forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();
        openUnansweredCall();

    });

});


function openUnansweredCall() {

    unansweredCurrentScene = "start";
    unansweredEnding = "";

    storyModal.classList.add("active");
    storyModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    showUnansweredScene();

}


// Display each scene
function showUnansweredScene() {

    const scene = unansweredCallStory[unansweredCurrentScene];

    storyContent.innerHTML = `

        <div class="story-progress">
            <div class="story-progress-fill"
                style="width: ${scene.ending ? "70" : "45"}%">
            </div>
        </div>

        <h2>${scene.title}</h2>

        ${scene.text}

        ${
            scene.ending
            ? `
                <button class="story-next" id="unansweredReveal">
                    Discover what was happening →
                </button>
              `
            : `
                <div class="story-choices">
                    ${scene.choices.map(choice => `
                        <button class="story-choice"
                            data-call-next="${choice.next}">
                            ${choice.text}
                        </button>
                    `).join("")}
                </div>
              `
        }

    `;


    document.querySelectorAll("[data-call-next]").forEach(button => {

        button.addEventListener("click", function() {

            unansweredCurrentScene = this.dataset.callNext;

            if (unansweredCallStory[unansweredCurrentScene].ending) {
                unansweredEnding = unansweredCurrentScene;
            }

            showUnansweredScene();

        });

    });


    const revealButton = document.getElementById("unansweredReveal");

    if (revealButton) {
        revealButton.addEventListener("click", showUnansweredPerspective);
    }

}


// Reveal the hidden perspective
function showUnansweredPerspective() {

    storyContent.innerHTML = `

        <div class="story-progress">
            <div class="story-progress-fill" style="width: 85%"></div>
        </div>

        <h2>What you couldn't see.</h2>

        <div class="story-reveal">

            <h3>Behind the unanswered call</h3>

            <p>
                Earlier that day, this person had received
                some difficult news. They had been trying
                to stay strong, but the day felt heavier
                than usual.
            </p>

            <p>
                They didn't need you to fix everything.
                They simply wanted to hear a familiar voice
                and feel a little less alone.
            </p>

            <p>
                The missed call was not an emergency.
                It was an attempt to feel connected.
            </p>

            <p><em>This is one possible story.
            Not every missed call has the same reason.</em></p>

        </div>

        <p>
            We often see a missed call.
            We don't always see the feelings behind it.
        </p>

        <button class="story-next" id="unansweredReflect">
            Reflect on this story →
        </button>

    `;

    document.getElementById("unansweredReflect").addEventListener(
        "click",
        showUnansweredReflection
    );

}


// Reflection
function showUnansweredReflection() {

    storyContent.innerHTML = `

        <div class="story-progress">
            <div class="story-progress-fill" style="width: 95%"></div>
        </div>

        <h2>A moment to reflect.</h2>

        <p>
            Has discovering the hidden story changed
            how you think about unanswered calls?
        </p>

        <div class="story-reflection">

            <label for="unansweredReflectionAnswer">
                Write your thoughts:
            </label>

            <textarea
                id="unansweredReflectionAnswer"
                placeholder="I learned that..."
            ></textarea>

        </div>

        <button class="story-next" id="completeUnanswered">
            Complete story ✓
        </button>

    `;

    document.getElementById("completeUnanswered").addEventListener(
        "click",
        completeUnansweredStory
    );

}


// Save completion
function completeUnansweredStory() {

    const answer = document.getElementById(
        "unansweredReflectionAnswer"
    ).value;

    localStorage.setItem("unansweredCallCompleted", "true");

    localStorage.setItem("unansweredCallEnding", unansweredEnding);

    localStorage.setItem("unansweredCallReflection", answer);

    updateMyJourney();

    storyContent.innerHTML = `

        <h2>Thank you for listening. 🤍</h2>

        <p>You have completed The Unanswered Call.</p>

        <div class="story-reveal">

            <h3>Remember this:</h3>

            <p>
                Sometimes people don't need answers.
                They just need someone willing to listen.
            </p>

        </div>

        <button class="story-next" id="replayUnanswered">
            Replay story ↻
        </button>

        <button class="story-choice" id="returnUnanswered">
            Return to homepage
        </button>

    `;

    document.getElementById("replayUnanswered").addEventListener(
        "click",
        openUnansweredCall
    );

    document.getElementById("returnUnanswered").addEventListener(
        "click",
        closeStoryWindow
    );

}


/* =================================
   STORY 03: THE NEW STUDENT
================================= */

let newStudentCurrentScene = "start";
let newStudentEnding = "";

const newStudentStory = {

    start: {
        title: "A new place. A new beginning.",
        text: `
            <p>It's your first week at a new university.</p>

            <p>You walk into the classroom and notice
            that almost everyone already has someone
            to sit with.</p>

            <p>You recognize no faces. You don't know
            the campus, the routines, or where you belong yet.</p>

            <p>A group of students nearby are laughing
            and talking together.</p>

            <p><strong>What would you do?</strong></p>
        `,
        choices: [
            {
                text: "Walk up and ask if you can join them.",
                next: "joinGroup"
            },
            {
                text: "Approach one student and start a conversation.",
                next: "approachStudent"
            },
            {
                text: "Find an empty seat and stay quiet.",
                next: "sitAlone"
            }
        ]
    },

    joinGroup: {
        title: "Taking the first step",
        text: `
            <p>You walk towards the group and politely ask,
            "Can I sit with you?"</p>

            <p>One student looks up and smiles.
            Another continues talking with a friend.</p>

            <p>You sit down, but you're not sure
            whether you should join their conversation.</p>

            <p>What would you do next?</p>
        `,
        choices: [
            {
                text: "Introduce yourself and join the conversation.",
                next: "welcomeEnding"
            },
            {
                text: "Stay quiet and wait for someone to talk to you.",
                next: "awkwardEnding"
            }
        ]
    },

    approachStudent: {
        title: "One conversation",
        text: `
            <p>You notice one student sitting nearby
            and decide to introduce yourself.</p>

            <p>"Hi, I'm new here. Is this seat taken?"</p>

            <p>They smile and say, "No, go ahead."</p>

            <p>After a little conversation, they mention
            that their friends are meeting after class.</p>

            <p>What would you do?</p>
        `,
        choices: [
            {
                text: "Ask if you can join them after class.",
                next: "welcomeEnding"
            },
            {
                text: "Thank them and keep to yourself.",
                next: "quietEnding"
            }
        ]
    },

    sitAlone: {
        title: "The empty seat",
        text: `
            <p>You choose an empty seat near the window.</p>

            <p>You look around while everyone else seems
            comfortable and familiar with one another.</p>

            <p>A little later, another student approaches
            and asks, "Hey, are you new here?"</p>

            <p>What would you say?</p>
        `,
        choices: [
            {
                text: "Yes! I'm still trying to find my way around.",
                next: "welcomeEnding"
            },
            {
                text: "Just smile and say, 'Yeah, a little.'",
                next: "quietEnding"
            }
        ]
    },

    welcomeEnding: {
        ending: true,
        title: "A small welcome.",
        text: `
            <p>You begin talking, and someone offers
            to show you around the campus.</p>

            <p>You discover that making a connection
            doesn't always require a big gesture.</p>

            <p>Sometimes, one conversation can make
            an unfamiliar place feel a little more welcoming.</p>
        `
    },

    awkwardEnding: {
        ending: true,
        title: "An awkward beginning.",
        text: `
            <p>You sit with the group, but the conversation
            continues around you.</p>

            <p>You try to find the right moment to speak,
            but it never quite comes.</p>

            <p>You leave the classroom wondering
            whether you will feel comfortable here.</p>

            <p>Not every first attempt leads to a connection.
            That doesn't mean another one won't.</p>
        `
    },

    quietEnding: {
        ending: true,
        title: "A moment of hesitation.",
        text: `
            <p>You keep to yourself and continue
            getting through the day.</p>

            <p>Perhaps you wanted to say more.
            Perhaps you simply needed some time.</p>

            <p>The opportunity to connect may come again.
            There is no single timeline for belonging.</p>
        `
    }

};


// Open The New Student
document.querySelectorAll('[data-story="new-student"]').forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();
        openNewStudentStory();

    });

});


function openNewStudentStory() {

    newStudentCurrentScene = "start";
    newStudentEnding = "";

    storyModal.classList.add("active");
    storyModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    showNewStudentScene();

}


// Display each scene
function showNewStudentScene() {

    const scene = newStudentStory[newStudentCurrentScene];

    storyContent.innerHTML = `

        <div class="story-progress">
            <div class="story-progress-fill"
                style="width: ${scene.ending ? "70" : "45"}%">
            </div>
        </div>

        <h2>${scene.title}</h2>

        ${scene.text}

        ${
            scene.ending
            ? `
                <button class="story-next" id="newStudentReveal">
                    Discover what was happening →
                </button>
              `
            : `
                <div class="story-choices">
                    ${scene.choices.map(choice => `
                        <button class="story-choice"
                            data-new-student-next="${choice.next}">
                            ${choice.text}
                        </button>
                    `).join("")}
                </div>
              `
        }

    `;


    document.querySelectorAll("[data-new-student-next]").forEach(button => {

        button.addEventListener("click", function() {

            newStudentCurrentScene = this.dataset.newStudentNext;

            if (newStudentStory[newStudentCurrentScene].ending) {
                newStudentEnding = newStudentCurrentScene;
            }

            showNewStudentScene();

        });

    });


    const revealButton = document.getElementById("newStudentReveal");

    if (revealButton) {
        revealButton.addEventListener("click", showNewStudentPerspective);
    }

}


// Reveal the hidden perspective
function showNewStudentPerspective() {

    storyContent.innerHTML = `

        <div class="story-progress">
            <div class="story-progress-fill" style="width: 85%"></div>
        </div>

        <h2>What you couldn't see.</h2>

        <div class="story-reveal">

            <h3>Behind the new student's silence</h3>

            <p>
                This student had recently moved away
                from home to continue their education.
                Everything felt unfamiliar.
            </p>

            <p>
                They were still learning the language,
                understanding different social habits,
                and trying to find their place.
            </p>

            <p>
                They wanted to make friends, but worried
                about saying something wrong or being judged.
            </p>

            <p>
                Sometimes, they needed a little time.
                Sometimes, they needed someone to make
                the first move.
            </p>

            <p><em>This is one possible story.
            Not every new student's experience is the same.</em></p>

        </div>

        <p>
            We see someone sitting alone.
            We don't always see how much courage
            it takes to begin somewhere new.
        </p>

        <button class="story-next" id="newStudentReflect">
            Reflect on this story →
        </button>

    `;

    document.getElementById("newStudentReflect").addEventListener(
        "click",
        showNewStudentReflection
    );

}


// Reflection
function showNewStudentReflection() {

    storyContent.innerHTML = `

        <div class="story-progress">
            <div class="story-progress-fill" style="width: 95%"></div>
        </div>

        <h2>A moment to reflect.</h2>

        <p>
            What could you do to help someone feel
            welcome in a new environment?
        </p>

        <div class="story-reflection">

            <label for="newStudentReflectionAnswer">
                Write your thoughts:
            </label>

            <textarea
                id="newStudentReflectionAnswer"
                placeholder="I could..."
            ></textarea>

        </div>

        <button class="story-next" id="completeNewStudent">
            Complete story ✓
        </button>

    `;

    document.getElementById("completeNewStudent").addEventListener(
        "click",
        completeNewStudentStory
    );

}


// Save completion
function completeNewStudentStory() {

    const answer = document.getElementById(
        "newStudentReflectionAnswer"
    ).value;

    localStorage.setItem("newStudentCompleted", "true");

    localStorage.setItem("newStudentEnding", newStudentEnding);

    localStorage.setItem("newStudentReflection", answer);

    updateMyJourney();

    storyContent.innerHTML = `

        <h2>Every beginning deserves kindness. 🤍</h2>

        <p>You have completed The New Student.</p>

        <div class="story-reveal">

            <h3>Remember this:</h3>

            <p>
                A simple hello, an invitation, or a seat
                beside someone can make an unfamiliar
                place feel a little less lonely.
            </p>

        </div>

        <button class="story-next" id="replayNewStudent">
            Replay story ↻
        </button>

        <button class="story-choice" id="returnNewStudent">
            Return to homepage
        </button>

    `;

    document.getElementById("replayNewStudent").addEventListener(
        "click",
        openNewStudentStory
    );

    document.getElementById("returnNewStudent").addEventListener(
        "click",
        closeStoryWindow
    );

}


/* =================================
   REFLECTION CORNER
================================= */

const generalReflection = document.getElementById("generalReflection");
const saveReflection = document.getElementById("saveReflection");
const reflectionMessage = document.getElementById("reflectionMessage");

// Load previously saved reflection
generalReflection.value = localStorage.getItem("generalReflection") || "";

// Save reflection
saveReflection.addEventListener("click", function() {

    const answer = generalReflection.value.trim();

    if (answer === "") {
        reflectionMessage.textContent = "Please write something before saving.";
        return;
    }

    localStorage.setItem("generalReflection", answer);
    updateMyJourney();

    reflectionMessage.textContent = "✓ Your reflection has been saved.";

});


/* =================================
   KINDNESS CHALLENGE
================================= */

// Get all kindness checkboxes
const kindnessChecks = document.querySelectorAll(".kindness-check");

const kindnessProgress = document.getElementById("kindnessProgress");
const kindnessProgressFill = document.getElementById("kindnessProgressFill");
const kindnessMessage = document.getElementById("kindnessMessage");


// Load saved kindness progress
const savedKindness = JSON.parse(
    localStorage.getItem("kindnessCompleted") || "[]"
);


// Restore previously completed challenges
kindnessChecks.forEach(check => {

    check.checked = savedKindness.includes(check.value);

});


// Update progress display
function updateKindnessProgress() {

    const completed = document.querySelectorAll(
        ".kindness-check:checked"
    ).length;

    const total = kindnessChecks.length;

    kindnessProgress.textContent =
        `${completed} of ${total} challenges completed`;

    const percentage = (completed / total) * 100;

    kindnessProgressFill.style.width = percentage + "%";
    if (completed === total) {
    kindnessMessage.textContent =
        "You've completed all five missions! Keep spreading kindness. 🤍";
} else {
    kindnessMessage.textContent =
        "Every small act of kindness matters. 🤍";
}

}


// Save progress whenever a checkbox changes
kindnessChecks.forEach(check => {

    check.addEventListener("change", function() {

        const completedChallenges = [];

        kindnessChecks.forEach(item => {

            if (item.checked) {
                completedChallenges.push(item.value);
            }

        });

        localStorage.setItem(
            "kindnessCompleted",
            JSON.stringify(completedChallenges)
        );

        updateKindnessProgress();
        updateMyJourney();

    });

});


// Show initial progress
updateKindnessProgress();


/* =================================
   MY JOURNEY DASHBOARD
================================= */

function updateMyJourney() {

    // Count completed stories
    const storyKeys = [
        "silentClassmateCompleted",
        "unansweredCallCompleted",
        "newStudentCompleted"
    ];

    let completedStories = 0;

    storyKeys.forEach(key => {

        if (localStorage.getItem(key) === "true") {
            completedStories++;
        }

    });


    // Count saved reflections
    const reflectionKeys = [
        "silentClassmateReflection",
        "unansweredCallReflection",
        "newStudentReflection",
        "generalReflection"
    ];

    let savedReflections = 0;

    reflectionKeys.forEach(key => {

        if (localStorage.getItem(key)?.trim()) {
            savedReflections++;
        }

    });


    // Count completed kindness missions
    const savedKindness = JSON.parse(
        localStorage.getItem("kindnessCompleted") || "[]"
    );

    const completedKindness = savedKindness.length;


    // Update dashboard numbers
    document.getElementById("journeyStories").textContent =
        `${completedStories}/3`;

    document.getElementById("journeyReflections").textContent =
        savedReflections;

    document.getElementById("journeyKindness").textContent =
        `${completedKindness}/5`;


    // Calculate overall progress
    const totalProgress =
        completedStories + savedReflections + completedKindness;

    const maximumProgress = 3 + 4 + 5;

    const percentage = Math.round(
        (totalProgress / maximumProgress) * 100
    );


    document.getElementById("journeyPercentage").textContent =
        percentage + "%";

    document.getElementById("journeyProgressFill").style.width =
        percentage + "%";


    // Display a message
    let message = "Your journey begins with one small step.";

    if (percentage === 100) {
        message = "You've completed your journey! Keep spreading kindness. 🤍";
    } else if (percentage >= 70) {
        message = "You're making wonderful progress. Keep going! ✨";
    } else if (percentage >= 30) {
        message = "Every small step makes a difference. 🌷";
    }

    document.getElementById("journeyMessage").textContent = message;

}


// Update dashboard when the page loads
updateMyJourney();