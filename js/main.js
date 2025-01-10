document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const input = document.getElementById('terminal-input');
    const buttonAI = document.getElementById('buttonai'); // Nút cho mobile

    const commands = {
        help: `
            <div class="response system">
                <span class="command clickable" data-command="list">help</span>       List available AI constructs<br>
                <span class="command clickable" data-command="list">list</span>       List available AI constructs<br>
                <span class="command clickable" data-command="info">info</span>       Access construct codex<br>
                <span class="command clickable" data-command="interface">interface</span>  Communicate with AI construct<br>
                <span class="command clickable" data-command="link">link</span>       Loads owned constructs into system.
            </div>
        `,
        list: `
            <div class="response system">
                Use <span>interface [name]</span> to communicate with an AI construct. <br><br>
                <span class="example">Example: <span>interface alice</span></span><br><br>
                <span class="command">alice</span> [VOLATILE]<br>
                <span class="command">sparky</span> [DECOMISSIONED. UNHELPFUL]<br>
                <span class="command">roadmap</span> [OVERFOCUSED]<br>
                <span class="command erebos">erebos</span> <span class="tagline erebos">[CAUTION. ENTITY █████]</span>
            </div>
        `,
        info: `
            <div class="response system">
                Enter <span>info</span> followed by a designation to view data on an AI. <br><br>
                <span class="example">Example: <span>info alice</span></span><br><br>
                <span class="command">alice</span> <br>
                <span class="command">sparky</span> <br>
                <span class="command">roadmap</span> <br>
                <span class="command erebos">erebos</span>
            </div>
        `,
        interface: `
            <div class="response system"><span>Syntax error:</span> No target specified. Use <span>interface [name]</span>. <br><br></div>
        `,
        alice: `
            <div class="response system">
                Load available AI constructs with <span>list</span>. <br><br> 
                Enter <span>help</span> for a list of commands.<br><br>
            </div>
        `,
        sparky: `
            <div class="response system">
                Load available AI constructs with <span>list</span>. <br><br> 
                Enter <span>help</span> for a list of commands.<br><br>
            </div>
        `,
        roadmap: `
            <div class="response system">
                Load available AI constructs with <span>list</span>. <br><br> 
                Enter <span>help</span> for a list of commands.<br><br>
            </div>
        `,
        erebos: `
            <div class="response system">
                Load available AI constructs with <span>list</span>. <br><br> 
                Enter <span>help</span> for a list of commands.<br><br>
            </div>
        `,
    };

    const addCommandToTerminal = (commandText, isUser = true) => {
        const commandElement = document.createElement('div');
        commandElement.className = isUser ? 'response user' : 'response system';
        commandElement.innerHTML = commandText;
        terminal.appendChild(commandElement);
        terminal.scrollTop = terminal.scrollHeight;
    };

    const handleCommand = () => {
        const commandText = input.value.trim();
        if (commandText) {
            addCommandToTerminal(`> ${commandText}`);
            if (commandText === 'link') {
                document.getElementById('link-popup').classList.toggle('visible');
                const response = `<div class="response system"><span>Wallet protocol:</span> UNAVAILABLE. Standby for future update.</div>`;
                addCommandToTerminal(response, false);
                bindClickEvents();
                input.value = '';
                return;
            }
            const response = commands[commandText] || `<div class="response system">Command not found: <span class="command">${commandText}</span></div>`;
            addCommandToTerminal(response, false);
            bindClickEvents();
        }
        input.value = '';
    };

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Ngăn chặn sự kiện mặc định
            handleCommand();
        }
    });

    buttonAI.addEventListener('click', () => {
        handleCommand();
    });

    const bindClickEvents = () => {
        const clickableCommands = document.querySelectorAll('.clickable');
        clickableCommands.forEach((element) => {
            element.removeEventListener('click', handleCommand); // Xóa sự kiện trùng lặp
            element.addEventListener('click', () => {
                const command = element.getAttribute('data-command');
                if (commands[command]) {
                    addCommandToTerminal(`> ${command}`);
                    addCommandToTerminal(commands[command], false);
                    bindClickEvents();
                }
            });
        });
    };

    bindClickEvents();
});
