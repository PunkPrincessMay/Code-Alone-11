// Name: Katie Summers;
// Description: Star Wars themed chat, app handler;

// Star Wars–themed chat data
const chatData = {
  general: [
    {
      sender: "Luke Skywalker",
      text: "May the Force be with you, everyone.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Always",
      fromSelf: true,
    },
    {
      sender: "Leia Organa",
      text: "Focus, team. We have a new transmission from Hoth Command.",
      fromSelf: false,
    },
  ],

  planning: [
    {
      sender: "Han Solo",
      text: "I've got a bad feeling about this mission...",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "It's just a quick hyperspace jump.",
      fromSelf: true,
    },
    {
      sender: "Chewbacca",
      text: "Rrrrghh!",
      fromSelf: false,
    },
    {
      sender: "Han Solo",
      text: "Chewie agrees. We should double-check the nav-computer.",
      fromSelf: false,
    },
  ],

  feedback: [
    {
      sender: "Obi-Wan Kenobi",
      text: "Remember: The Force will be with you, always.",
      fromSelf: false,
    },
    {
      sender: "Yoda",
      text: "Do or do not. There is no try.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Wise words",
      fromSelf: true,
    },
  ],
};

// Set up variables;
let selectedChannel = "general";
let channelButtons = document.querySelectorAll(".channel");

// Handles switching the active channel;
function changeChannel(e){
  let selectedChannel = e.currentTarget;
  let runningChannel = selectedChannel.dataset.channel;
  if(document.querySelector(".channel.active")){
    document.querySelector(".channel.active").classList.remove("active");
  }
  selectedChannel.classList.add("active");
  selectedChannel = runningChannel;
  populateMessages(selectedChannel);
  
};

// Populates the chat messages based on the selected channel;
function populateMessages(channel) {
  let template = document.querySelector("template");
  let chatContainer = document.getElementById("chat-messages");
  chatContainer.innerHTML = "";
  let messageSet = chatData[channel];

    messageSet.forEach((msg) => {
        const clone = template.content.cloneNode(true);

        const message = clone.querySelector(".message");
        const sender = clone.querySelector(".sender");
        const text = clone.querySelector(".text");

        sender.textContent = msg.sender + ":";
        text.textContent = msg.text;

        if (msg.fromSelf) {
            message.classList.add("self");
            sender.textContent = "You:";
        }

        chatContainer.appendChild(clone);
    });

    // Clear input if it exists
    let input = document.querySelector("#message-input");
    if (input) input.value = "";
}

// Set up event listeners for channel buttons;
document.querySelectorAll(".channel").forEach((button) => {
  button.addEventListener("click", changeChannel);
});
populateMessages(selectedChannel);

// Handle sending new messages;
function sendMessage() {
  let userInput = document.querySelector("#message-input");
  let input = userInput.value.trim();
  if (input) {
    chatData[selectedChannel].push({
      sender: "You",
      text: input,
      fromSelf: true,
    });
    populateMessages(selectedChannel);
  }
}
document.querySelector(".chat-input>button").addEventListener("click", sendMessage);