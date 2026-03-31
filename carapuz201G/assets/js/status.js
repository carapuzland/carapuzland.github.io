(function () {
    async function loadStatus() {
        const target = document.getElementById("statusContainer");
        if (!target) return;

        try {
            const response = await fetch("/carapuz201g/assets/data/status.json", { cache: "no-store" });
            if (!response.ok) throw new Error("Status not available");

            const data = await response.json();

            const online = data.online ? "Online" : "Offline";
            const onlineClass = data.online ? "status-online" : "status-offline";

            target.innerHTML = `
                <div class="status-grid">
                    <div class="status-card">
                        <h4 data-i18n="status.bot_status">Bot Status</h4>
                        <div class="status-value ${onlineClass}">${online}</div>
                    </div>
                    <div class="status-card">
                        <h4 data-i18n="status.guilds">Guilds</h4>
                        <div class="status-value">${data.guilds ?? "—"}</div>
                    </div>
                    <div class="status-card">
                        <h4 data-i18n="status.users">Users</h4>
                        <div class="status-value">${data.users ?? "—"}</div>
                    </div>
                    <div class="status-card">
                        <h4 data-i18n="status.latency">Latency</h4>
                        <div class="status-value">${data.latency_ms ? data.latency_ms + " ms" : "—"}</div>
                    </div>
                    <div class="status-card">
                        <h4 data-i18n="status.uptime">Uptime</h4>
                        <div class="status-value">${data.uptime ?? "—"}</div>
                    </div>
                    <div class="status-card">
                        <h4 data-i18n="status.version">Version</h4>
                        <div class="status-value">${data.version ?? "—"}</div>
                    </div>
                </div>
            `;
        } catch (e) {
            target.innerHTML = `
                <div class="status-grid">
                    <div class="status-card">
                        <h4>Bot Status</h4>
                        <div class="status-value status-offline">Unknown</div>
                    </div>
                </div>
            `;
        }
    }

    document.addEventListener("DOMContentLoaded", loadStatus);
})();