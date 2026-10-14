(() => {
  'use strict';

  // Values and stored business identifiers remain in their source language.
  // Give every option an explicit value before translating its visible label.
  const languages = Object.freeze([
    Object.freeze({ code: 'zh', label: '中文' }),
    Object.freeze({ code: 'en', label: 'English' }),
    Object.freeze({ code: 'fr', label: 'Français' }),
    Object.freeze({ code: 'ja', label: '日本語' })
  ]);
  const rows = [
    ['工作台', 'Workspace', 'Espace de travail', 'ワークスペース'],
    ['工作区', 'Workspace', 'Espace de travail', 'ワークスペース'],
    ['工作', 'Work', 'Travail', '業務'],
    ['任务', 'Tasks', 'Tâches', 'タスク'],
    ['作业', 'Operations', 'Opérations', '作業'],
    ['复核', 'Review', 'Revue', '確認'],
    ['资源', 'Resources', 'Ressources', 'リソース'],
    ['设备', 'Devices', 'Équipements', '機器'],
    ['工具', 'Tools', 'Outils', 'ツール'],
    ['组织', 'Organization', 'Organisation', '組織'],
    ['设置', 'Settings', 'Paramètres', '設定'],
    ['帮助与关于', 'Help & about', 'Aide et à propos', 'ヘルプ・情報'],
    ['帮助', 'Help', 'Aide', 'ヘルプ'],
    ['通知', 'Notifications', 'Notifications', '通知'],
    ['当前角色', 'Current role', 'Rôle actuel', '現在の役割'],
    ['管', 'A', 'A', '管'],
    ['研', 'R', 'R', '研'],
    ['本地', 'Local', 'Local', 'ローカル'],
    ['本地资料', 'Local data', 'Données locales', 'ローカル資料'],
    ['本地工作区', 'Local workspace', 'Espace local', 'ローカル作業領域'],
    ['研发工作区', 'R&D workspace', 'Espace R&D', '研究開発領域'],
    ['全局导航', 'Main navigation', 'Navigation principale', '全体ナビゲーション'],
    ['全局搜索', 'Workspace search', 'Recherche globale', '全体検索'],
    ['搜索任务、设备、资料', 'Search tasks, devices, evidence', 'Rechercher tâches, équipements, preuves', 'タスク・機器・資料を検索'],
    ['搜索任务', 'Search tasks', 'Rechercher des tâches', 'タスクを検索'],
    ['搜索', 'Search', 'Rechercher', '検索'],
    ['新建任务', 'New task', 'Nouvelle tâche', 'タスクを作成'],
    ['创建任务', 'Create task', 'Créer la tâche', 'タスクを作成'],
    ['任务名称', 'Task name', 'Nom de la tâche', 'タスク名'],
    ['输入任务名称', 'Enter task name', 'Saisir le nom de la tâche', 'タスク名を入力'],
    ['填写对象与需要保留的依据', 'Describe the target and required evidence', 'Décrire la cible et les preuves à conserver', '対象と保存する資料を入力'],
    ['全部任务', 'All tasks', 'Toutes les tâches', 'すべてのタスク'],
    ['进行中', 'Active', 'En cours', '進行中'],
    ['全部状态', 'All statuses', 'Tous les statuts', 'すべての状態'],
    ['状态', 'Status', 'Statut', '状態'],
    ['任务状态', 'Task status', 'Statut de la tâche', 'タスクの状態'],
    ['平台', 'Platform', 'Plateforme', 'プラットフォーム'],
    ['平台 / 工具', 'Platform / tool', 'Plateforme / outil', '機体 / ツール'],
    ['管理任务', 'Manage tasks', 'Gérer les tâches', 'タスク管理'],
    ['归档所选', 'Archive selected', 'Archiver la sélection', '選択項目をアーカイブ'],
    ['选择当前列表', 'Select visible tasks', 'Sélectionner les tâches affichées', '表示中のタスクを選択'],
    ['没有匹配的任务', 'No matching tasks', 'Aucune tâche correspondante', '一致するタスクはありません'],
    ['没有匹配记录', 'No matching records', 'Aucun enregistrement correspondant', '一致する記録はありません'],
    ['刷新', 'Refresh', 'Actualiser', '更新'],
    ['当前任务', 'Selected task', 'Tâche sélectionnée', '選択中のタスク'],
    ['任务详情', 'Task details', 'Détails de la tâche', 'タスク詳細'],
    ['打开任务', 'Open task', 'Ouvrir la tâche', 'タスクを開く'],
    ['查看记录', 'View record', 'Voir le dossier', '記録を表示'],
    ['任务设备', 'Task devices', 'Équipements des tâches', 'タスク用機器'],
    ['工具库', 'Tool library', 'Bibliothèque d’outils', 'ツール一覧'],
    ['查看全部', 'View all', 'Tout afficher', 'すべて表示'],
    ['待处理复核', 'Pending reviews', 'Revues en attente', '確認待ち'],
    ['打开队列', 'Open queue', 'Ouvrir la file', '一覧を開く'],
    ['暂无待处理复核', 'No pending reviews', 'Aucune revue en attente', '確認待ちはありません'],
    ['项目', 'Project', 'Projet', 'プロジェクト'],
    ['研发任务', 'R&D task', 'Tâche R&D', '研究開発タスク'],
    ['工作区结构预览', 'Workspace preview', 'Aperçu de l’espace', '作業領域プレビュー'],
    ['其余工作区待下一制作阶段', 'Other workspaces are being prepared', 'Les autres espaces sont en préparation', 'ほかの作業領域は準備中です'],
    ['任务计划', 'Task plan', 'Plan de tâche', 'タスク計画'],
    ['目标与职责', 'Goal & responsibilities', 'Objectif et responsabilités', '目的・担当'],
    ['资源配置', 'Resource setup', 'Configuration des ressources', 'リソース設定'],
    ['人工准备', 'Manual preparation', 'Préparation manuelle', '手動準備'],
    ['任务步骤', 'Task steps', 'Étapes de la tâche', 'タスク手順'],
    ['计划与准备', 'Plan & preparation', 'Plan et préparation', '計画・準備'],
    ['现场资料', 'Field evidence', 'Preuves terrain', '現場資料'],
    ['复核意见', 'Review comments', 'Avis de revue', '確認コメント'],
    ['任务记录', 'Task record', 'Dossier de tâche', 'タスク記録'],
    ['保存更改', 'Save changes', 'Enregistrer', '変更を保存'],
    ['进入作业', 'Open operations', 'Ouvrir les opérations', '作業を開く'],
    ['任务目标', 'Task goal', 'Objectif de la tâche', 'タスクの目的'],
    ['观察对象', 'Observation target', 'Cible d’observation', '観察対象'],
    ['任务类型', 'Task type', 'Type de tâche', 'タスク種別'],
    ['观察资料', 'Evidence observation', 'Observation des preuves', '資料の観察'],
    ['固定台架交互', 'Fixed-bench interaction', 'Interaction sur banc fixe', '固定台上の操作'],
    ['负责人', 'Owner', 'Responsable', '担当者'],
    ['复核人', 'Reviewer', 'Réviseur', '確認者'],
    ['计划日期', 'Planned date', 'Date prévue', '予定日'],
    ['完成准备', 'Complete preparation', 'Terminer la préparation', '準備を完了'],
    ['保存并准备', 'Save preparation', 'Enregistrer la préparation', '準備内容を保存'],
    ['确认目标', 'Confirm target', 'Confirmer la cible', '対象を確認'],
    ['整理依据', 'Organize evidence', 'Organiser les preuves', '資料を整理'],
    ['人员复核', 'Human review', 'Revue humaine', '担当者による確認'],
    ['补充观察', 'Additional observation', 'Observation complémentaire', '追加観察'],
    ['准备条件', 'Preparation checks', 'Conditions de préparation', '準備条件'],
    ['已记录', 'Recorded', 'Enregistré', '記録済み'],
    ['未记录', 'Not recorded', 'Non enregistré', '未記録'],
    ['任务版本', 'Task version', 'Version de tâche', 'タスク版'],
    ['配置版本', 'Configuration version', 'Version de configuration', '設定版'],
    ['配置', 'Configuration', 'Configuration', '設定'],
    ['归档任务', 'Archive task', 'Archiver la tâche', 'タスクをアーカイブ'],
    ['恢复任务', 'Restore task', 'Restaurer la tâche', 'タスクを復元'],
    ['复制任务', 'Duplicate task', 'Dupliquer la tâche', 'タスクを複製'],
    ['打开记录', 'Open record', 'Ouvrir le dossier', '記録を開く'],
    ['导入影像', 'Import image', 'Importer une image', '画像を取り込む'],
    ['影像资料', 'Image evidence', 'Preuves visuelles', '画像資料'],
    ['视频源', 'Video source', 'Source vidéo', '映像ソース'],
    ['未接入', 'Not connected', 'Non connecté', '未接続'],
    ['人工标注', 'Manual annotation', 'Annotation manuelle', '手動注釈'],
    ['人工区域', 'Manual region', 'Zone manuelle', '手動領域'],
    ['调整区域', 'Adjust region', 'Ajuster la zone', '領域を調整'],
    ['保存区域', 'Save region', 'Enregistrer la zone', '領域を保存'],
    ['查看原图', 'View original', 'Voir l’original', '元画像を表示'],
    ['提交复核', 'Submit for review', 'Soumettre à revue', '確認を依頼'],
    ['观察笔记', 'Observation notes', 'Notes d’observation', '観察メモ'],
    ['后续建议', 'Follow-up suggestion', 'Suggestion de suivi', '次の提案'],
    ['资料来源', 'Evidence source', 'Source des preuves', '資料の出典'],
    ['拍摄时间', 'Capture time', 'Date de prise de vue', '撮影日時'],
    ['时间来源', 'Timestamp source', 'Source de l’horodatage', '時刻の出典'],
    ['原始尺寸', 'Original dimensions', 'Dimensions originales', '元画像サイズ'],
    ['区域版本', 'Region version', 'Version de zone', '領域版'],
    ['证据版本', 'Evidence version', 'Version des preuves', '資料版'],
    ['建议版本', 'Suggestion version', 'Version de suggestion', '提案版'],
    ['当前对象', 'Selected object', 'Objet sélectionné', '選択中の対象'],
    ['建议', 'Suggestion', 'Suggestion', '提案'],
    ['信息缺口', 'Missing information', 'Informations manquantes', '不足情報'],
    ['绑定版本', 'Linked versions', 'Versions liées', '関連版'],
    ['保存建议', 'Save suggestion', 'Enregistrer la suggestion', '提案を保存'],
    ['复核工作台', 'Review workspace', 'Espace de revue', '確認ワークスペース'],
    ['待处理', 'Pending', 'En attente', '未処理'],
    ['已处理', 'Processed', 'Traité', '処理済み'],
    ['复核事项', 'Review item', 'Élément à revoir', '確認項目'],
    ['判断依据', 'Decision evidence', 'Preuves de décision', '判断資料'],
    ['人员意见', 'Reviewer comments', 'Avis du réviseur', '担当者の意見'],
    ['接受建议', 'Accept suggestion', 'Accepter la suggestion', '提案を承認'],
    ['退回补充', 'Request more evidence', 'Demander un complément', '追加資料を依頼'],
    ['已确认', 'Confirmed', 'Confirmé', '確認済み'],
    ['待送审', 'Ready for review', 'À soumettre', '確認依頼待ち'],
    ['已失效', 'Outdated', 'Obsolète', '失効'],
    ['全部事件', 'All events', 'Tous les événements', 'すべてのイベント'],
    ['任务事件', 'Task events', 'Événements de tâche', 'タスクイベント'],
    ['资料事件', 'Evidence events', 'Événements des preuves', '資料イベント'],
    ['复核事件', 'Review events', 'Événements de revue', '確認イベント'],
    ['查看当时依据', 'View evidence at that time', 'Voir les preuves d’alors', '当時の資料を表示'],
    ['导出记录', 'Export record', 'Exporter le dossier', '記録を書き出す'],
    ['关联文件', 'Linked files', 'Fichiers liés', '関連ファイル'],
    ['关联证据', 'Linked evidence', 'Preuves liées', '関連資料'],
    ['当前决定', 'Current decision', 'Décision actuelle', '現在の判断'],
    ['等待补充观察', 'Awaiting additional observation', 'Observation complémentaire attendue', '追加観察待ち'],
    ['暂无有效决定', 'No valid decision', 'Aucune décision valide', '有効な判断はありません'],
    ['未产生设备命令', 'No device command issued', 'Aucune commande envoyée', '機器への指令は未発行'],
    ['登记设备', 'Register device', 'Enregistrer un équipement', '機器を登録'],
    ['登记工具', 'Register tool', 'Enregistrer un outil', 'ツールを登録'],
    ['资源名称', 'Resource name', 'Nom de la ressource', 'リソース名'],
    ['类型', 'Type', 'Type', '種類'],
    ['维护状态', 'Maintenance status', 'État de maintenance', '保守状態'],
    ['接口配置', 'Interface configuration', 'Configuration d’interface', '接続設定'],
    ['保存资源', 'Save resource', 'Enregistrer la ressource', 'リソースを保存'],
    ['证据资料', 'Evidence', 'Preuves', '証拠資料'],
    ['证据', 'Evidence', 'Preuves', '資料'],
    ['导入文件', 'Import file', 'Importer un fichier', 'ファイルを取り込む'],
    ['原始文件', 'Original file', 'Fichier original', '元ファイル'],
    ['文件指纹', 'File fingerprint', 'Empreinte du fichier', 'ファイル指紋'],
    ['成员与角色', 'Members & roles', 'Membres et rôles', 'メンバー・役割'],
    ['添加成员', 'Add member', 'Ajouter un membre', 'メンバーを追加'],
    ['成员名称', 'Member name', 'Nom du membre', 'メンバー名'],
    ['职责', 'Responsibilities', 'Responsabilités', '担当業務'],
    ['启用', 'Enabled', 'Activé', '有効'],
    ['停用', 'Disabled', 'Désactivé', '無効'],
    ['保存成员', 'Save member', 'Enregistrer le membre', 'メンバーを保存'],
    ['界面语言', 'Interface language', 'Langue de l’interface', '表示言語'],
    ['列表密度', 'List density', 'Densité de liste', '一覧の密度'],
    ['舒适', 'Comfortable', 'Confortable', '標準'],
    ['紧凑', 'Compact', 'Compact', 'コンパクト'],
    ['导出工作区', 'Export workspace', 'Exporter l’espace', '作業領域を書き出す'],
    ['导入备份', 'Import backup', 'Importer une sauvegarde', 'バックアップを取り込む'],
    ['工作区名称', 'Workspace name', 'Nom de l’espace', '作業領域名'],
    ['存储位置', 'Storage location', 'Emplacement de stockage', '保存先'],
    ['本浏览器', 'This browser', 'Ce navigateur', 'このブラウザー'],
    ['来源', 'Source', 'Source', '出典'],
    ['关联任务', 'Linked task', 'Tâche liée', '関連タスク'],
    ['文件大小', 'File size', 'Taille du fichier', 'ファイルサイズ'],
    ['确认范围', 'Review scope', 'Périmètre de revue', '確認範囲'],
    ['后续观察建议', 'Follow-up observation', 'Observation de suivi', '追加観察の提案'],
    ['区域', 'Region', 'Zone', '領域'],
    ['左侧', 'Left', 'Gauche', '左端'],
    ['上侧', 'Top', 'Haut', '上端'],
    ['宽度', 'Width', 'Largeur', '幅'],
    ['高度', 'Height', 'Hauteur', '高さ'],
    ['保存', 'Save', 'Enregistrer', '保存'],
    ['取消', 'Cancel', 'Annuler', 'キャンセル'],
    ['关闭', 'Close', 'Fermer', '閉じる'],
    ['未分配', 'Unassigned', 'Non attribué', '未割り当て'],
    ['请选择', 'Select', 'Sélectionner', '選択してください'],
    ['无视频源', 'No video source', 'Aucune source vidéo', '映像ソースなし'],
    ['选择资料', 'Select evidence', 'Sélectionner les preuves', '資料を選択'],
    ['编辑', 'Edit', 'Modifier', '編集'],
    ['操作', 'Actions', 'Actions', '操作'],
    ['名称', 'Name', 'Nom', '名前'],
    ['任务配置', 'Task configuration', 'Configuration de tâche', 'タスク設定'],
    ['本地登记', 'Local registration', 'Enregistrement local', 'ローカル登録'],
    ['资源已停用', 'Resource disabled', 'Ressource désactivée', 'リソースは無効です'],
    ['暂无资料', 'No evidence', 'Aucune preuve', '資料はありません'],
    ['暂无任务', 'No tasks', 'Aucune tâche', 'タスクはありません'],
    ['暂无复核事项', 'No review items', 'Aucun élément à revoir', '確認項目はありません'],
    ['草稿', 'Draft', 'Brouillon', '下書き'],
    ['待准备', 'Preparation pending', 'À préparer', '準備待ち'],
    ['待复核', 'Review pending', 'À revoir', '確認待ち'],
    ['待补充', 'More evidence needed', 'Complément requis', '追加資料待ち'],
    ['已归档', 'Archived', 'Archivé', 'アーカイブ済み'],
    ['维护中', 'Under maintenance', 'En maintenance', '保守中'],
    ['待检查', 'Check pending', 'À vérifier', '点検待ち'],
    ['已登记', 'Registered', 'Enregistré', '登録済み'],
    ['未指定', 'Unspecified', 'Non précisé', '未指定'],
    ['工作区管理员', 'Workspace admin', 'Administrateur', '管理者'],
    ['研发操作员', 'R&D operator', 'Opérateur R&D', '研究開発担当'],
    ['资料复核员', 'Evidence reviewer', 'Réviseur des preuves', '資料確認担当'],
    ['只读访客', 'Read-only guest', 'Visiteur en lecture seule', '閲覧ゲスト'],
    ['当前记录保存在此浏览器。任务和资料管理可在本地操作；机器人、云服务及视频源尚未接入。', 'Synthetic demonstration. Changes last only in the current tab; robots, cloud services and video sources are not connected.', 'Les dossiers sont stockés dans ce navigateur. La gestion des tâches et des preuves est locale ; les robots, services cloud et sources vidéo ne sont pas connectés.', '記録はこのブラウザーに保存されます。タスクと資料はローカルで管理でき、ロボット・クラウド・映像ソースは未接続です。'],
    ['工作区信息', 'Workspace information', 'Informations de l’espace', '作業領域情報'],
    ['初始资料', 'Initial data', 'Données initiales', '初期資料'],
    ['本地参考资料集', 'Local reference dataset', 'Jeu de références local', 'ローカル参考資料集'],
    ['参考资料集', 'Reference dataset', 'Jeu de références', '参考資料集'],
    ['影像来源', 'Image source', 'Source de l’image', '画像の出典'],
    ['合成结构示意图', 'Generated photographic reference', 'Référence photographique générée', '生成された写真風の参考画像'],
    ['参考影像', 'Reference image', 'Image de référence', '参考画像'],
    ['角色模式', 'Role mode', 'Mode de rôle', '役割モード'],
    ['本地视图规则；非服务器安全隔离', 'Local view rules; no server-side access isolation', 'Règles de vue locales ; sans isolation d’accès serveur', 'ローカル表示ルール。サーバー側のアクセス分離ではありません'],
    ['本地角色视图', 'Local role view', 'Vue de rôle locale', 'ローカル役割ビュー'],
    ['角色仅控制本地界面的操作入口。生产身份认证需后端接入。', 'Roles control local interface actions only. Production authentication requires a backend.', 'Les rôles contrôlent uniquement les actions locales. L’authentification de production nécessite un serveur.', '役割はローカル画面の操作だけを制御します。本番の認証にはバックエンドが必要です。'],
    ['应用角色', 'Apply role', 'Appliquer le rôle', '役割を適用'],
    ['待办通知', 'Pending notifications', 'Notifications en attente', '未処理の通知'],
    ['等待资料复核', 'Awaiting evidence review', 'Revue des preuves attendue', '資料の確認待ち'],
    ['暂无通知', 'No notifications', 'Aucune notification', '通知はありません'],
    ['任务已创建', 'Task created', 'Tâche créée', 'タスクを作成しました'],
    ['浏览器存储不可用，本次修改尚未持久保存', 'Browser storage is unavailable. Changes have not been saved.', 'Le stockage du navigateur est indisponible. Les modifications ne sont pas enregistrées.', 'ブラウザーの保存領域が利用できません。変更は保存されていません。'],
    ['观察', 'Observation', 'Observation', '観察'],
    ['台架交互', 'Bench interaction', 'Interaction sur banc', '台上操作'],
    ['四旋翼', 'Quadrotor', 'Quadrirotor', '四ローター'],
    ['接口研究配置', 'Interface research setup', 'Configuration d’étude d’interface', '接続部の研究設定'],
    ['外观概念参考；无连接记录', 'Appearance concept; no connection record', 'Concept visuel ; aucune connexion enregistrée', '外観コンセプト。接続記録なし'],
    ['本地资源登记', 'Local resource registration', 'Enregistrement local de ressource', 'ローカルリソース登録'],
    ['视觉观察工具', 'Visual Observation Tool', 'Visual Observation Tool', 'スーパービジョン'],
    ['台架工具', 'Bench Tool', 'Préhension adaptative', '異形把持'],
    ['可见光、距离与热信息的感知方向', 'Visible-light, distance and thermal sensing concept', 'Concept de perception visible, distance et thermique', '可視光・距離・熱情報のセンシング構想'],
    ['轻训练件的受控接触与持握研究', 'Controlled contact and grasping of light training parts', 'Étude du contact et de la préhension de pièces d’essai légères', '軽量訓練部品の接触・把持研究'],
    ['预置示例时间', 'Preset example time', 'Horodatage d’exemple', '設定済みサンプル時刻'],
    ['R-03 基座近照', 'R-03 base close-up', 'R-03 gros plan de la base', 'R-03 基部の近接画像'],
    ['R-03 基座与锚固', 'R-03 base and anchors', 'R-03 base et ancrages', 'R-03 基部とアンカー'],
    ['R-03 栏杆基座', 'R-03 railing base', 'R-03 base du garde-corps', 'R-03 手すり基部'],
    ['岸边栏杆基座巡检', 'Shore railing base inspection', 'Inspection de la base du garde-corps', '岸辺の手すり基部点検'],
    ['滨水设施观察', 'Waterfront facility observation', 'Observation des installations riveraines', '水辺施設の観察'],
    ['记录基座表面与锚固区域，补足另一侧观察依据。', 'Record the base surface and anchors; add evidence from the other side.', 'Documenter la surface de la base et les ancrages ; compléter avec l’autre côté.', '基部表面とアンカー領域を記録し、反対側の観察資料を追加します。'],
    ['补充基座另一侧近照', 'Add a close-up of the other side', 'Ajouter un gros plan de l’autre côté', '基部の反対側を追加撮影'],
    ['任务资料建立', 'Task data created', 'Données de tâche créées', 'タスク資料を作成'],
    ['关联观察依据', 'Observation evidence linked', 'Preuves d’observation liées', '観察資料を関連付け'],
    ['提交资料复核', 'Evidence submitted for review', 'Preuves soumises à revue', '資料の確認を依頼'],
    ['复核范围：后续观察建议', 'Review scope: follow-up observation', 'Périmètre : observation de suivi', '確認範囲：追加観察の提案'],
    ['接口复装检查', 'Interface reassembly check', 'Vérification du remontage d’interface', '接続部の再装着確認'],
    ['Sample Device 接口研究', 'Sample Device interface research', 'Étude d’interface Sample Device', 'Sample Device 接続部の研究'],
    ['锁止与接合', 'Locking and mating', 'Verrouillage et accouplement', 'ロックと接合'],
    ['整理人工接口复装条件。', 'Document manual interface reassembly conditions.', 'Documenter les conditions du remontage manuel.', '接続部の手動再装着条件を整理します。'],
    ['轻训练件持握方案', 'Training-part grasp plan', 'Préhension de pièce d’essai', '軽量訓練部品の把持計画'],
    ['台架工具实验', 'Bench tool study', 'Étude d’outils sur banc', '台上ツール実験'],
    ['轻训练件', 'Light training part', 'Pièce d’essai légère', '軽量訓練部品'],
    ['固定台架条件下整理持握和释放步骤。', 'Plan grasp and release steps on a fixed bench.', 'Préparer les étapes de préhension et de relâchement sur banc fixe.', '固定台上で把持と解放の手順を整理します。'],
    ['视觉观察工具安装资料检查', 'Visual Observation Tool installation review', 'Revue d’installation Visual Observation Tool', 'スーパービジョン装着資料の確認'],
    ['工具接口研究', 'Tool interface research', 'Étude d’interface d’outil', 'ツール接続部の研究'],
    ['SV-01 安装记录', 'SV-01 installation record', 'SV-01 dossier d’installation', 'SV-01 装着記録'],
    ['核对安装资料、线束与工具身份。', 'Check installation evidence, wiring and tool identity.', 'Vérifier les documents d’installation, le câblage et l’identité de l’outil.', '装着資料・配線・ツール識別を確認します。'],
    ['研发资料归集', 'R&D reference collection', 'Collecte des références R&D', '研究開発資料の集約'],
    ['项目资料', 'Project data', 'Données de projet', 'プロジェクト資料'],
    ['资料索引', 'Evidence index', 'Index des preuves', '資料索引'],
    ['保存已有参考资料索引。', 'Save the existing reference index.', 'Conserver l’index des références existantes.', '既存の参考資料索引を保存します。'],
    ['任务目标与现场边界', 'Task goal and site boundaries', 'Objectif et limites du site', 'タスクの目的と現場範囲'],
    ['工具身份与安装记录', 'Tool identity and installation record', 'Identité de l’outil et dossier d’installation', 'ツール識別と装着記録'],
    ['人员职责与观察计划', 'Responsibilities and observation plan', 'Responsabilités et plan d’observation', '担当業務と観察計画'],
    ['创建本地任务记录', 'Local task record created', 'Dossier local de tâche créé', 'ローカルタスク記録を作成'],
    ['关联复核失效', 'Linked review invalidated', 'Revue liée invalidée', '関連確認が失効'],
    ['资料已变更', 'Evidence changed', 'Preuves modifiées', '資料が変更されました'],
    ['依据已变更', 'Evidence changed', 'Preuves modifiées', '判断資料が変更されました'],
    ['更改已保存', 'Changes saved', 'Modifications enregistrées', '変更を保存しました'],
    ['保存成功', 'Saved', 'Enregistré', '保存しました'],
    ['无法保存', 'Unable to save', 'Enregistrement impossible', '保存できません'],
    ['导入成功', 'Imported', 'Importé', '取り込みました'],
    ['导入失败', 'Import failed', 'Échec de l’importation', '取り込みに失敗しました'],
    ['文件不存在', 'File not found', 'Fichier introuvable', 'ファイルが見つかりません'],
    ['请选择任务', 'Select a task', 'Sélectionner une tâche', 'タスクを選択してください'],
    ['请选择文件', 'Select a file', 'Sélectionner un fichier', 'ファイルを選択してください'],
    ['请输入任务名称', 'Enter a task name', 'Saisir un nom de tâche', 'タスク名を入力してください'],
    ['请输入任务目标', 'Enter a task goal', 'Saisir un objectif', 'タスクの目的を入力してください'],
    ['任务工具', 'Task tools', 'Outils de tâche', 'タスク用ツール'],
    ['任务目标缺失', 'Task goal is missing', 'Objectif manquant', 'タスクの目的が未入力です'],
    ['保存失败，请保留当前输入并重试', 'Save failed. Keep your input and retry.', 'Échec de l’enregistrement. Conservez la saisie et réessayez.', '保存に失敗しました。入力内容を保持して再試行してください。'],
    ['全部资料', 'All evidence', 'Toutes les preuves', 'すべての資料'],
    ['准备记录未完成', 'Preparation record is incomplete', 'Dossier de préparation incomplet', '準備記録が未完了です'],
    ['办理人员', 'Assigned staff', 'Personnel désigné', '担当者'],
    ['原始影像', 'Original image', 'Image originale', '元画像'],
    ['参考记录', 'Reference record', 'Dossier de référence', '参考記録'],
    ['参考资料集 · 目标 R-03', 'Reference dataset · Target R-03', 'Jeu de références · Cible R-03', '参考資料集 · 対象 R-03'],
    ['另一侧基座表面不可见', 'The other side of the base is not visible', 'L’autre côté de la base n’est pas visible', '基部の反対側は見えていません'],
    ['另一侧表面与接合区域不可见', 'The other surface and joint are not visible', 'L’autre surface et la jonction ne sont pas visibles', '反対側の表面と接合部は見えていません'],
    ['基座一侧影像', 'Image of one side of the base', 'Image d’un côté de la base', '基部の片側画像'],
    ['填写意见', 'Enter comments', 'Saisir un avis', '意見を入力'],
    ['复核人未分配或无办理角色', 'Reviewer is unassigned or lacks the required role', 'Réviseur non attribué ou rôle requis absent', '確認者が未割り当て、または必要な役割がありません'],
    ['尚未标注', 'Not annotated', 'Non annoté', '未注釈'],
    ['工作区成员', 'Workspace members', 'Membres de l’espace', '作業領域のメンバー'],
    ['工具不适用于当前任务', 'Tool is not suitable for this task', 'Outil inadapté à cette tâche', '現在のタスクに適さないツールです'],
    ['工具身份', 'Tool identity', 'Identité de l’outil', 'ツール識別'],
    ['工具身份不可用', 'Tool identity is unavailable', 'Identité de l’outil indisponible', 'ツール識別が利用できません'],
    ['已有存储无法读取，请先恢复工作区', 'Stored data cannot be read. Restore the workspace first.', 'Données stockées illisibles. Restaurez d’abord l’espace.', '保存データを読み込めません。先に作業領域を復元してください。'],
    ['已有存储无法读取，请导入有效备份', 'Stored data cannot be read. Import a valid backup.', 'Données stockées illisibles. Importez une sauvegarde valide.', '保存データを読み込めません。有効なバックアップを取り込んでください。'],
    ['已查看当前依据', 'Current evidence reviewed', 'Preuves actuelles consultées', '現在の資料を確認済み'],
    ['当前依据需重新提交', 'Current evidence must be resubmitted', 'Preuves actuelles à soumettre à nouveau', '現在の資料は再提出が必要です'],
    ['当前版本', 'Current version', 'Version actuelle', '現在の版'],
    ['当前角色无办理权限', 'This role cannot perform this action', 'Ce rôle ne peut pas effectuer cette action', '現在の役割ではこの操作を行えません'],
    ['成员', 'Members', 'Membres', 'メンバー'],
    ['指定复核人', 'Assign reviewer', 'Désigner un réviseur', '確認者を指定'],
    ['放大', 'Zoom in', 'Agrandir', '拡大'],
    ['数据', 'Data', 'Données', 'データ'],
    ['文件', 'Files', 'Fichiers', 'ファイル'],
    ['暂无意见', 'No comments', 'Aucun avis', '意見はありません'],
    ['暂无记录', 'No records', 'Aucun dossier', '記録はありません'],
    ['本地保留', 'Retained locally', 'Conservation locale', 'ローカル保持'],
    ['本地记录', 'Local record', 'Dossier local', 'ローカル記録'],
    ['版本', 'Version', 'Version', '版'],
    ['用途', 'Purpose', 'Usage', '用途'],
    ['界面', 'Interface', 'Interface', '画面'],
    ['设备动作', 'Device action', 'Action de l’équipement', '機器の動作'],
    ['设备资源', 'Device resources', 'Ressources d’équipement', '機器リソース'],
    ['设备资源不可用', 'Device resource is unavailable', 'Équipement indisponible', '機器リソースが利用できません'],
    ['负责人未分配或已停用', 'Owner is unassigned or inactive', 'Responsable non attribué ou inactif', '担当者が未割り当て、または無効です'],
    ['资源编号', 'Resource ID', 'Identifiant de ressource', 'リソースID'],
    ['连接状态', 'Connection status', 'État de connexion', '接続状態'],
    ['连接设置', 'Connection settings', 'Paramètres de connexion', '接続設定'],
    ['适合画布', 'Fit to canvas', 'Ajuster au cadre', '画面に合わせる'],
    ['人工准备记录', 'Manual preparation record', 'Dossier de préparation manuelle', '手動準備の記録'],
    ['准备记录已保存', 'Preparation record saved', 'Préparation enregistrée', '準備記録を保存済み'],
    ['仅记录后续观察建议', 'Records follow-up observation only', 'Enregistre uniquement l’observation de suivi', '追加観察の提案のみ記録'],
    ['区域尚未保存', 'Region not saved', 'Zone non enregistrée', '領域が未保存です'],
    ['下载 JSON', 'Download JSON', 'Télécharger JSON', 'JSONをダウンロード'],
    ['人工区域已更改', 'Manual region changed', 'Zone manuelle modifiée', '手動領域を変更'],
    ['从已有任务创建新记录', 'Create a record from an existing task', 'Créer un dossier depuis une tâche', '既存のタスクから記録を作成'],
    ['任务人员信息已更改', 'Task staff changed', 'Personnel de tâche modifié', 'タスクの担当者を変更'],
    ['任务已归档', 'Task archived', 'Tâche archivée', 'タスクをアーカイブしました'],
    ['任务已恢复', 'Task restored', 'Tâche restaurée', 'タスクを復元しました'],
    ['任务或准备配置已更改', 'Task or preparation changed', 'Tâche ou préparation modifiée', 'タスクまたは準備設定を変更'],
    ['保存人工准备记录', 'Save manual preparation', 'Enregistrer la préparation manuelle', '手動準備を保存'],
    ['保存目标、职责与资源配置', 'Save goal, responsibilities and resources', 'Enregistrer objectif, responsabilités et ressources', '目的・担当・リソース設定を保存'],
    ['保留任务与历史资料', 'Keep the task and its history', 'Conserver la tâche et son historique', 'タスクと履歴資料を保持'],
    ['关联资源配置已更改', 'Linked resource setup changed', 'Configuration des ressources liées modifiée', '関連リソース設定を変更'],
    ['准备已保存', 'Preparation saved', 'Préparation enregistrée', '準備を保存しました'],
    ['副本', 'Copy', 'Copie', 'コピー'],
    ['区域已保存', 'Region saved', 'Zone enregistrée', '領域を保存しました'],
    ['区域需位于影像范围内', 'The region must remain inside the image', 'La zone doit rester dans l’image', '領域は画像の範囲内に設定してください'],
    ['后续建议缺失', 'Follow-up suggestion is missing', 'Suggestion de suivi manquante', '次の提案が未入力です'],
    ['备份格式或影像文件无效', 'Invalid backup or image file', 'Sauvegarde ou image invalide', 'バックアップまたは画像ファイルが無効です'],
    ['导入时间', 'Import time', 'Date d’importation', '取り込み日時'],
    ['导入资料', 'Import evidence', 'Importer des preuves', '資料を取り込む'],
    ['导出任务记录', 'Export task record', 'Exporter le dossier de tâche', 'タスク記録を書き出す'],
    ['尚未关联资料', 'No evidence linked', 'Aucune preuve liée', '資料が未関連です'],
    ['工作区已保存', 'Workspace saved', 'Espace enregistré', '作業領域を保存しました'],
    ['工作区已恢复', 'Workspace restored', 'Espace restauré', '作業領域を復元しました'],
    ['已在复核队列', 'Already in the review queue', 'Déjà dans la file de revue', '確認一覧に登録済みです'],
    ['已提交复核', 'Submitted for review', 'Soumis à revue', '確認を依頼しました'],
    ['已退回补充', 'More evidence requested', 'Complément demandé', '追加資料を依頼しました'],
    ['建议已保存', 'Suggestion saved', 'Suggestion enregistrée', '提案を保存しました'],
    ['当前依据或办理权限已变化', 'Evidence or action permissions have changed', 'Les preuves ou droits d’action ont changé', '判断資料または操作権限が変更されています'],
    ['当前角色已切换', 'Role changed', 'Rôle modifié', '役割を切り替えました'],
    ['当时依据', 'Evidence at that time', 'Preuves à cette date', '当時の資料'],
    ['影像文件缺失', 'Image file missing', 'Fichier image manquant', '画像ファイルがありません'],
    ['影像文件缺失，无法导出完整工作区', 'Image files are missing. A complete workspace export is unavailable.', 'Images manquantes. L’exportation complète de l’espace est impossible.', '画像ファイルがないため、作業領域全体を書き出せません。'],
    ['影像无法读取', 'Unable to read image', 'Image illisible', '画像を読み込めません'],
    ['恢复备份', 'Restore backup', 'Restaurer la sauvegarde', 'バックアップを復元'],
    ['恢复工作区', 'Restore workspace', 'Restaurer l’espace', '作業領域を復元'],
    ['意见已记录', 'Comments recorded', 'Avis enregistré', '意見を記録しました'],
    ['成员已保存', 'Member saved', 'Membre enregistré', 'メンバーを保存しました'],
    ['提交当前配置、资料和观察意见', 'Submit configuration, evidence and comments', 'Soumettre configuration, preuves et avis', '現在の設定・資料・観察意見を提出'],
    ['新增关联影像', 'New image linked', 'Nouvelle image liée', '画像を新規関連付け'],
    ['更新人工区域', 'Update manual region', 'Actualiser la zone manuelle', '手動領域を更新'],
    ['更新任务', 'Update task', 'Actualiser la tâche', 'タスクを更新'],
    ['更新观察意见', 'Update observation notes', 'Actualiser les notes d’observation', '観察意見を更新'],
    ['本地导入', 'Local import', 'Importation locale', 'ローカル取り込み'],
    ['没有更改', 'No changes', 'Aucune modification', '変更はありません'],
    ['界面已保存', 'Interface settings saved', 'Paramètres d’interface enregistrés', '画面設定を保存しました'],
    ['确认后续观察建议', 'Confirm follow-up observation', 'Confirmer l’observation de suivi', '追加観察の提案を確認'],
    ['编辑成员', 'Edit member', 'Modifier le membre', 'メンバーを編集'],
    ['编辑资源', 'Edit resource', 'Modifier la ressource', 'リソースを編集'],
    ['观察意见已更改', 'Observation notes changed', 'Notes d’observation modifiées', '観察意見を変更'],
    ['请保留当前管理员', 'Keep the current administrator', 'Conserver l’administrateur actuel', '現在の管理者を保持してください'],
    ['请先保存区域与建议', 'Save the region and suggestion first', 'Enregistrer d’abord la zone et la suggestion', '先に領域と提案を保存してください'],
    ['请填写补充意见', 'Enter the requested additions', 'Préciser le complément demandé', '補足意見を入力してください'],
    ['请补全准备', 'Complete preparation first', 'Compléter d’abord la préparation', '準備項目を完了してください'],
    ['请选择不超过 12 MB 的图片', 'Select an image up to 12 MB', 'Choisir une image de 12 Mo maximum', '12 MB以下の画像を選択してください'],
    ['资料已导入', 'Evidence imported', 'Preuves importées', '資料を取り込みました'],
    ['资源已保存', 'Resource saved', 'Ressource enregistrée', 'リソースを保存しました'],
    ['资源编号已存在', 'Resource ID already exists', 'Identifiant de ressource déjà utilisé', 'リソースIDがすでに存在します'],
    ['重新整理任务准备记录', 'Revise the preparation record', 'Réviser le dossier de préparation', 'タスクの準備記録を見直す'],
    ['请选择任务类型', 'Select a task type', 'Sélectionner un type de tâche', 'タスク種別を選択してください'],
    ['请选择职责', 'Select a role', 'Sélectionner un rôle', '役割を選択してください'],
    ['请保存有效的人工区域', 'Save a valid manual region', 'Enregistrer une zone manuelle valide', '有効な手動領域を保存してください'],
    ['影像文件缺失或与记录不一致', 'Image file missing or inconsistent with its record', 'Image manquante ou différente du dossier', '画像ファイルがないか、記録と一致しません'],
    ['保存已有存储', 'Save stored data', 'Enregistrer les données stockées', '既存の保存データを保存'],
    ['已有存储', 'Stored data', 'Données stockées', '既存の保存データ'],
    ['数据格式更新', 'Data format updated', 'Format des données mis à jour', 'データ形式を更新'],
    ['补充资源版本与文件指纹；历史意见保留', 'Resource versions and file fingerprints added; previous comments retained', 'Versions des ressources et empreintes des fichiers ajoutées ; avis antérieurs conservés', 'リソース版とファイル指紋を追加。以前の意見は保持']
  ];
  const dictionary = new Map(rows.map(([zh, en, fr, ja]) => [zh, { en, fr, ja }]));
  const textSources = new WeakMap();
  const attributeSources = new WeakMap();
  const normalizeLanguage = lang => {
    const code = String(lang || 'zh').toLowerCase().split(/[-_]/)[0];
    return ['zh', 'en', 'fr', 'ja'].includes(code) ? code : 'zh';
  };
  const exact = (text, lang) => dictionary.get(text)?.[lang];
  const versionPattern = /^(任务|配置|任务版本|配置版本|区域版本|证据版本|区域|证据|人工区域|建议版本|建议)\s*[vV]\s*(\d+)$/;
  const identifierPattern = /^(?:MISSION OS|[A-Za-z][A-Za-z0-9_.-]*|\d[\d:/. -]*)$/;

  function translateCore(text, lang) {
    const known = exact(text, lang);
    if (known !== undefined) return known;
    let match = text.match(/^(\d+)\s*条任务(?:\s*·\s*已选\s*(\d+)\s*条)?$/);
    if (match) {
      const count = match[1], selected = match[2];
      const label = lang === 'en' ? `${count} ${count === '1' ? 'task' : 'tasks'}` : lang === 'fr' ? `${count} ${count === '1' ? 'tâche' : 'tâches'}` : `${count} 件のタスク`;
      return selected === undefined ? label : label + (lang === 'en' ? ` · ${selected} selected` : lang === 'fr' ? ` · ${selected} ${selected === '1' ? 'sélectionnée' : 'sélectionnées'}` : ` · ${selected} 件選択`);
    }
    match = text.match(/^(?:·\s*)?已选\s*(\d+)\s*条$/);
    if (match) {
      const prefix = text.startsWith('·') ? '· ' : '';
      return prefix + (lang === 'en' ? `${match[1]} selected` : lang === 'fr' ? `${match[1]} ${match[1] === '1' ? 'sélectionnée' : 'sélectionnées'}` : `${match[1]} 件選択`);
    }
    match = text.match(/^(\d+)\s*(条事件|条资源|个文件|位成员|名成员|个成员|条记录)$/);
    if (match) {
      const counts = {
        '条事件': { en: ['event', 'events'], fr: ['événement', 'événements'], ja: '件のイベント' },
        '条资源': { en: ['resource', 'resources'], fr: ['ressource', 'ressources'], ja: '件のリソース' },
        '个文件': { en: ['file', 'files'], fr: ['fichier', 'fichiers'], ja: 'ファイル' },
        '位成员': { en: ['member', 'members'], fr: ['membre', 'membres'], ja: '人のメンバー' },
        '名成员': { en: ['member', 'members'], fr: ['membre', 'membres'], ja: '人のメンバー' },
        '个成员': { en: ['member', 'members'], fr: ['membre', 'membres'], ja: '人のメンバー' },
        '条记录': { en: ['record', 'records'], fr: ['dossier', 'dossiers'], ja: '件の記録' }
      };
      const count = match[1], forms = counts[match[2]][lang];
      return lang === 'ja' ? `${count} ${forms}` : `${count} ${forms[Number(count) === 1 ? 0 : 1]}`;
    }
    match = text.match(/^(左侧|上侧|宽度|高度)\s*%$/);
    if (match) return `${exact(match[1], lang)} %`;
    // Canvas status has a fixed dimension/empty prefix and one of two known states.
    match = text.match(/^(\d+\s*×\s*\d+|—)\s*·\s*(原始影像|未接入)$/);
    if (match) return `${match[1]} · ${exact(match[2], lang)}`;
    match = text.match(/^第\s*(\d+)\s*页(?:\s*\/\s*(\d+))?$/);
    if (match) return lang === 'ja' ? `${match[1]} ページ${match[2] ? ` / ${match[2]}` : ''}` : `Page ${match[1]}${match[2] ? ` / ${match[2]}` : ''}`;
    match = text.match(versionPattern);
    if (match) return `${exact(match[1], lang)} v${match[2]}`;
    match = text.match(/^已切换为(工作区管理员|研发操作员|资料复核员|只读访客)$/);
    if (match) return lang === 'en' ? `Role: ${exact(match[1], lang)}` : lang === 'fr' ? `Rôle : ${exact(match[1], lang)}` : `役割：${exact(match[1], lang)}`;
    // Only the known selection wrapper is translated; arbitrary task names remain intact.
    match = text.match(/^选择 (.+)$/);
    if (match) {
      const name = match[1];
      return lang === 'en' ? `Select ${name}` : lang === 'fr' ? `Sélectionner ${name}` : `${name}を選択`;
    }
    // Limited UI composites: dictionary labels, versions and unchanged IDs only.
    const parts = text.split(/\s*·\s*/);
    if (parts.length > 1 && parts.every(part => dictionary.has(part) || versionPattern.test(part) || identifierPattern.test(part))) {
      return parts.map(part => translateCore(part, lang)).join(' · ');
    }
    return text;
  }

  function translate(text, lang) {
    const source = String(text ?? '');
    const language = normalizeLanguage(lang);
    if (language === 'zh' || !source.trim()) return source;
    const [, leading, core, trailing] = source.match(/^(\s*)([\s\S]*?)(\s*)$/);
    return leading + translateCore(core, language) + trailing;
  }

  function sourceRecord(previous, current) {
    if (!previous || (current !== previous.last && current !== previous.source)) return { source: current, last: current };
    return previous;
  }

  function protectedElement(element) {
    const tag = element.tagName?.toUpperCase();
    return ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'PRE', 'CODE'].includes(tag) ||
      element.hasAttribute('data-user-content') || element.hasAttribute('data-i18n-skip') ||
      element.isContentEditable || (element.hasAttribute('contenteditable') && element.getAttribute('contenteditable') !== 'false');
  }

  function protectedAncestor(node) {
    let element = node.parentElement;
    while (element) {
      if (protectedElement(element)) return true;
      element = element.parentElement;
    }
    return false;
  }

  function apply(root, lang) {
    const scope = root || window.document;
    if (!scope || protectedAncestor(scope)) return scope;
    const language = normalizeLanguage(lang);
    const stack = [scope];
    while (stack.length) {
      const node = stack.pop();
      if (node.nodeType === 3) {
        const current = node.nodeValue || '';
        const record = sourceRecord(textSources.get(node), current);
        const output = translate(record.source, language);
        if (output !== current) node.nodeValue = output;
        record.last = output;
        textSources.set(node, record);
        continue;
      }
      if (node.nodeType === 1) {
        // Placeholders may be translated even on textareas; their values/children are not.
        if (node.hasAttribute('data-user-content') || node.hasAttribute('data-i18n-skip') || node.isContentEditable ||
          (node.hasAttribute('contenteditable') && node.getAttribute('contenteditable') !== 'false')) continue;
        const tag = node.tagName.toUpperCase();
        if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'PRE', 'CODE'].includes(tag)) continue;
        const records = attributeSources.get(node) || new Map();
        for (const name of ['placeholder', 'title', 'aria-label']) {
          if (!node.hasAttribute(name)) { records.delete(name); continue; }
          const current = node.getAttribute(name);
          const record = sourceRecord(records.get(name), current);
          const output = translate(record.source, language);
          if (output !== current) node.setAttribute(name, output);
          record.last = output;
          records.set(name, record);
        }
        attributeSources.set(node, records);
        if (tag === 'INPUT' || tag === 'TEXTAREA') continue;
      }
      for (let i = (node.childNodes?.length || 0) - 1; i >= 0; i--) stack.push(node.childNodes[i]);
    }
    return scope;
  }

  window.MISSION_I18N = Object.freeze({ languages, translate, apply });
})();
