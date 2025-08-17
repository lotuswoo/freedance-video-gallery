#!/usr/bin/env node

/**
 * 驗證 works.json 文件的腳本
 * 確保數據格式正確，圖片文件存在
 */

const fs = require('fs');
const path = require('path');

function validateWorks() {
    console.log('🔍 開始驗證作品數據...\n');
    
    // 檢查 works.json 是否存在
    const worksPath = path.join(process.cwd(), 'works.json');
    if (!fs.existsSync(worksPath)) {
        console.log('⚠️  works.json 文件不存在，這是正常的（如果還沒有上傳作品）');
        return true;
    }
    
    try {
        // 讀取和解析 JSON
        const worksData = JSON.parse(fs.readFileSync(worksPath, 'utf8'));
        
        if (!worksData.works || !Array.isArray(worksData.works)) {
            console.error('❌ works.json 格式錯誤：缺少 works 數組');
            return false;
        }
        
        console.log(`📊 找到 ${worksData.works.length} 個作品`);
        
        let validCount = 0;
        let errorCount = 0;
        
        // 驗證每個作品
        worksData.works.forEach((work, index) => {
            const errors = [];
            
            // 檢查必要字段
            if (!work.id) errors.push('缺少 id');
            if (!work.title) errors.push('缺少 title');
            if (!work.gifUrl && !work.webpUrl) errors.push('缺少圖片URL');
            if (!work.uploadDate) errors.push('缺少 uploadDate');
            
            // 檢查圖片文件是否存在（如果是本地路徑）
            if (work.gifUrl && work.gifUrl.startsWith('./images/')) {
                const imagePath = path.join(process.cwd(), work.gifUrl);
                if (!fs.existsSync(imagePath)) {
                    errors.push(`GIF文件不存在: ${work.gifUrl}`);
                }
            }
            
            if (work.webpUrl && work.webpUrl.startsWith('./images/')) {
                const imagePath = path.join(process.cwd(), work.webpUrl);
                if (!fs.existsSync(imagePath)) {
                    errors.push(`WebP文件不存在: ${work.webpUrl}`);
                }
            }
            
            if (errors.length > 0) {
                console.error(`❌ 作品 ${index + 1} (${work.title || 'Unknown'}):`);
                errors.forEach(error => console.error(`   - ${error}`));
                errorCount++;
            } else {
                validCount++;
            }
        });
        
        console.log(`\n📈 驗證結果:`);
        console.log(`✅ 有效作品: ${validCount}`);
        console.log(`❌ 錯誤作品: ${errorCount}`);
        
        if (errorCount > 0) {
            console.error(`\n💥 發現 ${errorCount} 個錯誤，請修復後重試`);
            return false;
        }
        
        console.log('\n🎉 所有作品數據驗證通過！');
        return true;
        
    } catch (error) {
        console.error('❌ 解析 works.json 失敗:', error.message);
        return false;
    }
}

function validateImages() {
    console.log('\n🖼️  檢查圖片目錄...');
    
    const imagesPath = path.join(process.cwd(), 'images');
    if (!fs.existsSync(imagesPath)) {
        console.log('⚠️  images 目錄不存在，這是正常的（如果還沒有上傳圖片）');
        return true;
    }
    
    const files = fs.readdirSync(imagesPath);
    const imageFiles = files.filter(file => 
        file.toLowerCase().endsWith('.gif') || 
        file.toLowerCase().endsWith('.webp') ||
        file.toLowerCase().endsWith('.png') ||
        file.toLowerCase().endsWith('.jpg') ||
        file.toLowerCase().endsWith('.jpeg')
    );
    
    console.log(`📁 找到 ${imageFiles.length} 個圖片文件`);
    
    if (imageFiles.length > 0) {
        console.log('   圖片列表:');
        imageFiles.forEach(file => {
            const filePath = path.join(imagesPath, file);
            const stats = fs.statSync(filePath);
            const sizeKB = Math.round(stats.size / 1024);
            console.log(`   - ${file} (${sizeKB} KB)`);
        });
    }
    
    return true;
}

function main() {
    console.log('🚀 freedance.video 作品數據驗證工具\n');
    
    const worksValid = validateWorks();
    const imagesValid = validateImages();
    
    if (worksValid && imagesValid) {
        console.log('\n✅ 所有驗證通過，可以安全部署！');
        process.exit(0);
    } else {
        console.log('\n❌ 驗證失敗，請修復錯誤後重試');
        process.exit(1);
    }
}

// 如果直接運行此腳本
if (require.main === module) {
    main();
}

module.exports = { validateWorks, validateImages };

