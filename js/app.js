// ========================================
// APPLICATION ENTRY POINT
// ========================================

// Initialize modals dynamically
function initModals() {
    const modalsHTML = `
    <!-- ========================================
         RECEIPT MODAL
    ========================================= -->
    <div id="receiptModal" class="modal">
        <div class="modal-content receipt-modal">
            <button class="modal-close" onclick="Controller.closeReceipt()">
                <i class="fas fa-times"></i>
            </button>
            <div id="receiptContent">
                <!-- Receipt will be generated here -->
            </div>
            <div class="modal-actions">
                <button class="btn btn-print" onclick="Controller.printReceipt()">
                    <i class="fas fa-print"></i> Print
                </button>
                <button class="btn btn-secondary" onclick="Controller.closeReceipt()">
                    Close
                </button>
            </div>
        </div>
    </div>

    <!-- ========================================
         LOGIN MODAL
    ========================================= -->
    <div id="loginModal" class="modal">
        <div class="modal-content">
            <button class="modal-close" onclick="View.hideLoginForm()">
                <i class="fas fa-times"></i>
            </button>
            <h2><i class="fas fa-sign-in-alt"></i> Login</h2>
            <form id="loginForm" onsubmit="event.preventDefault(); Controller.loginUser();">
                <div class="form-group">
                    <label for="loginUsername">Username</label>
                    <input type="text" id="loginUsername" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" required>
                </div>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
            </form>
        </div>
    </div>
    `;
    
    // Append modals to body
    document.body.insertAdjacentHTML('beforeend', modalsHTML);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modals first
    initModals();
    
    // Initialize the POS System
    Controller.initSystem();
    
    // Show POS page by default
    Controller.showPage('pos');
    
    console.log('🎉 Restaurant POS System Ready!');
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Application Error:', event.error);
    View.showAlert('An error occurred. Please try again.', 'error');
});

// Handle print events
window.addEventListener('beforeprint', () => {
    console.log('Printing receipt...');
});

window.addEventListener('afterprint', () => {
    console.log('Print completed');
    // Close modal after print
    setTimeout(() => {
        Controller.closeReceipt();
    }, 500);
});
