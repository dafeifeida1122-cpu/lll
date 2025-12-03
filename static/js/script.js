// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    addEventListeners();
    startStatsCounter();
});

// 初始化页面
function initializePage() {
    // 添加键盘事件监听
    const stockInput = document.getElementById('stockCode');
    stockInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            analyzeStock();
        }
    });

    // 只允许输入数字
    stockInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 4) {
            this.value = this.value.slice(0, 4);
        }
    });
}

// 添加事件监听器
function addEventListeners() {
    // 输入框焦点效果
    const input = document.getElementById('stockCode');
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });

    // 按钮悬停效果增强
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 启动实时统计数据更新
function startStatsCounter() {
    let diagnosedCount = 12847;
    let successRate = 94.2;
    
    // 更新诊股人数
    setInterval(() => {
        diagnosedCount += Math.floor(Math.random() * 3) + 1; // 每次增加1-3人
        document.getElementById('diagnosedCount').textContent = diagnosedCount.toLocaleString();
    }, 3000); // 每3秒更新一次
    
    // 更新成功率（微小波动）
    setInterval(() => {
        const change = (Math.random() - 0.5) * 0.2; // -0.1 到 +0.1 的变化
        successRate += change;
        // 保持在92-96%之间
        successRate = Math.max(92.0, Math.min(96.0, successRate));
        document.getElementById('successRate').textContent = successRate.toFixed(1) + '%';
    }, 8000); // 每8秒微调一次
}

// 设置示例代码
function setExample(code) {
    const input = document.getElementById('stockCode');
    input.value = code;
    
    // 添加高亮效果
    input.style.background = 'rgba(102, 126, 234, 0.1)';
    setTimeout(() => {
        input.style.background = 'rgba(255, 255, 255, 0.9)';
    }, 500);
    
    // 聚焦到输入框
    input.focus();
}

// 分析股票
function analyzeStock() {
    const stockCode = document.getElementById('stockCode').value.trim();
    
    // 验证输入
    if (!stockCode) {
        addLineAccount()
    }
    
    
    // 显示加载状态
    showLoadingState(true);
    
    // 模拟AI分析过程
    setTimeout(() => {
        generateAnalysisResult(stockCode);
        showLoadingState(false);
    }, 2500);
}

// 显示加载状态
function showLoadingState(isLoading) {
    const btn = document.querySelector('.primary-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    } else {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        btn.disabled = false;
        btn.style.cursor = 'pointer';
    }
}

// 生成分析结果
function generateAnalysisResult(stockCode) {
    showAnalysisResult(stockCode);
}

// 显示分析结果
function showAnalysisResult(stockCode) {
    const modal = document.getElementById('resultModal');
    const modalBody = document.getElementById('modalBody');
    
    const resultHTML = `
        <div class="result-container">
            <div class="line-notice">
                <div class="line-icon">
                     <img src="static/video/line.png" alt="LINE" class="line-icon-img">
                </div>
                <h2>AI診断完了</h2>
                <p class="stock-info">株式コード: <strong>${stockCode}</strong></p>
                <p class="notice-text">
                    詳細な診断レポートをご希望の方は、<br>
                    下記のLINEを追加して完整版レポートを<br>
                    無料でお受け取りください。
                </p>
                
                <div class="line-button">
                    <button class="add-line-btn" onclick="addLineAccount()">
                        <img src="static/video/line.png" alt="LINE" class="line-icon-img">
                        アカウントを追加
                    </button>
                </div>
                
                <div class="benefits">
                    <div class="benefit-item">✓ 詳細な財務分析</div>
                    <div class="benefit-item">✓ 投資リスク評価</div>
                    <div class="benefit-item">✓ 今後の予測レポート</div>
                </div>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = resultHTML;
    modal.style.display = 'flex';
}

// 显示样本报告
function showSampleReport() {
    generateAnalysisResult('7203');
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('resultModal');
    modal.style.display = 'none';
}



// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-family: 'Noto Sans JP', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // 自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 添加必要的CSS动画
const additionalStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fillScore {
        from { width: 0; }
        to { width: var(--target-width); }
    }
    
    .result-container {
        text-align: center;
    }
    
    .stock-header {
        margin-bottom: 20px;
    }
    
    .stock-code {
        font-size: 1.5rem;
        font-weight: bold;
        color: #667eea;
    }
    
    .stock-name {
        font-size: 1.2rem;
        color: #333;
        margin-top: 5px;
    }
    
    .price-info {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;
    }
    
    .current-price {
        font-size: 2rem;
        font-weight: bold;
        color: #333;
    }
    
    .price-change {
        font-size: 1.1rem;
        font-weight: 500;
        padding: 5px 10px;
        border-radius: 6px;
    }
    
    .price-change.positive {
        background: #e8f5e8;
        color: #4CAF50;
    }
    
    .price-change.negative {
        background: #ffeaea;
        color: #f44336;
    }
    
    .ai-score {
        margin-bottom: 25px;
    }
    
    .score-label {
        font-size: 1rem;
        color: #666;
        margin-bottom: 10px;
    }
    
    .score-bar {
        background: #f0f0f0;
        height: 20px;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 8px;
    }
    
    .score-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        width: 0;
        transition: width 1.5s ease-out;
    }
    
    .score-value {
        font-size: 1.1rem;
        font-weight: bold;
        color: #667eea;
    }
    
    .recommendation {
        margin-bottom: 25px;
    }
    
    .rec-label {
        font-size: 1rem;
        color: #666;
        margin-bottom: 8px;
    }
    
    .rec-value {
        font-size: 1.3rem;
        font-weight: bold;
        padding: 8px 16px;
        border-radius: 8px;
        display: inline-block;
    }
    
    .rec-value.買い {
        background: #e8f5e8;
        color: #4CAF50;
    }
    
    .rec-value.売り {
        background: #ffeaea;
        color: #f44336;
    }
    
    .rec-value.中立 {
        background: #f0f0f0;
        color: #666;
    }
    
    .analysis-text {
        text-align: left;
        margin-bottom: 25px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 12px;
    }
    
    .analysis-text h3 {
        margin-bottom: 15px;
        color: #333;
        font-size: 1.2rem;
    }
    
    .analysis-text p {
        line-height: 1.6;
        color: #555;
    }
    
    .action-buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .action-btn {
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Noto Sans JP', sans-serif;
    }
    
    .action-btn.primary {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
    }
    
    .action-btn.secondary {
        background: transparent;
        color: #667eea;
        border: 2px solid #667eea;
    }
    
    .action-btn:hover {
        transform: translateY(-2px);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-icon {
        font-weight: bold;
        font-size: 1.2rem;
    }
`;

// 将样式添加到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('resultModal');
    if (e.target === modal) {
        closeModal();
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
