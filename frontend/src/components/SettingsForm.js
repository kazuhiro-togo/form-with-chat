// frontend/src/components/SettingsForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, Select, MenuItem, InputLabel, Checkbox, FormGroup } from '@mui/material';
import axios from 'axios';

const SettingsForm = ({ reload }) => { // `reload`プロパティを受け取る
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        occupation: '',
        hobby: '',
        allergies: [],
    });

    const [message, setMessage] = useState('');

    const occupations = {
        ENGINEER: "エンジニア",
        DOCTOR: "医師",
        IDOL: "アイドル",
        ARCHIVIST: "アーキビスト",
        ACTUARY: "アクチュアリー",
        ASSISTANT_DIRECTOR: "アシスタントディレクター",
        ATHLETIC_TRAINER: "アスレティックトレーナー",
        ARTIST: "アーティスト",
        ART_DIRECTOR: "アートディレクター",
        ANNOUNCER: "アナウンサー",
        ANIMATOR: "アニメーター",
        DIVER: "海人",
        AMERICAN_FOOTBALL_PLAYER: "アメリカンフットボール選手",
        ARRANGER: "アレンジャー",
        MASSAGE_THERAPIST: "あん摩マッサージ指圧師",
        STONEMASON: "石工",
        SHAMAN: "イタコ",
        CHEF: "板前",
        FOUNDRY_WORKER: "鋳物工",
        ILLUSTRATOR: "イラストレーター",
        MEDICAL_SUPERVISOR: "医療監視員",
        MEDICAL_OFFICE_STAFF: "医療事務員",
        MEDICAL_WORKER: "医療従事者",
        HEALTH_INSURANCE_CLERK: "医療保険事務",
        TATTOO_ARTIST: "刺青師",
        INSTRUCTOR: "インストラクター",
        INDUSTRIAL_DESIGNER: "インダストリアルデザイナー",
        NATURAL_INTERPRETER: "インタープリター (自然)",
        INTERIOR_COORDINATOR: "インテリアコーディネーター",
        INTERIOR_DESIGNER: "インテリアデザイナー",
        WEDDING_PLANNER: "ウェディングプランナー",
        WEB_DESIGNER: "ウェブデザイナー",
        CORMORANT_FISHERMAN: "鵜飼い",
        UKIYOE_ARTIST: "浮世絵師",
        ASTRONAUT: "宇宙飛行士",
        FORTUNE_TELLER: "占い師",
        DRIVER: "運転士",
        CHAUFFEUR: "運転手",
        SUBSTITUTE_DRIVER: "運転代行",
        FILM_DIRECTOR: "映画監督",
        FILM_CREW: "映画スタッフ",
        ACTOR: "映画俳優",
        FILM_PRODUCER: "映画プロデューサー",
        SALES_REPRESENTATIVE: "営業員",
        GUARD: "衛視",
        HYGIENE_INSPECTOR: "衛生検査技師",
        VIDEO_CREATOR: "映像作家",
        NUTRITION_EDUCATOR: "栄養教諭",
        NUTRITIONIST: "栄養士",
        STATION_STAFF: "駅員",
        STATION_MASTER: "駅長",
        EXTERIOR_DESIGNER: "エクステリアデザイナー",
        EXECUTIVE_PRODUCER: "エグゼクティブ・プロデューサー",
        PAINTER: "絵師",
        ESTHETICIAN: "エステティシャン",
        EDITORIAL_DESIGNER: "エディトリアルデザイナー",
        PICTURE_BOOK_AUTHOR: "絵本作家",
        ENKA_SINGER: "演歌歌手",
        HORTICULTURIST: "園芸家",
        DIRECTOR: "演出家",
        PERFORMER: "演奏家",
        FIREFIGHTER: "消防士",
        COMPOSER: "作曲家",
        POET: "詩人",
        MUSICIAN: "ミュージシャン",
        SCIENTIST: "科学者",
        MATHEMATICIAN: "数学者",
        PHOTOGRAPHER: "写真家",
        PHYSICIST: "物理学者",
        POLICE_OFFICER: "警察官",
        POSTAL_WORKER: "郵便配達員",
        PRINCIPAL: "校長",
        PROFESSOR: "教授",
        PROGRAMMER: "プログラマー",
        REPORTER: "記者",
        SECRETARY: "秘書",
        SECURITY_GUARD: "警備員",
        SOFTWARE_ENGINEER: "ソフトウェアエンジニア",
        STUDENT: "学生",
        TEACHER: "教師",
        TRANSLATOR: "翻訳者",
        WRITER: "作家",
        YOUTUBER: "ユーチューバー",
        ZOOKEEPER: "動物園の飼育員",
        FLORIST: "花屋",
        FARMER: "農家",
        DENTIST: "歯科医",
        THERAPIST: "セラピスト",
        ELECTRICIAN: "電気技師",
        PILOT: "パイロット",
        MECHANIC: "整備士",
        PHARMACIST: "薬剤師",
        ARCHITECT: "建築家",
        BANKER: "銀行員",
        CHEMIST: "化学者",
        CONSULTANT: "コンサルタント",
        CRAFTSPERSON: "職人",
        DESIGNER: "デザイナー",
        ECONOMIST: "経済学者",
        ENGINE_DRIVER: "機関士",
        ENTREPRENEUR: "起業家",
        FASHION_DESIGNER: "ファッションデザイナー",
        FINANCIAL_ADVISOR: "ファイナンシャルアドバイザー",
        GARDENER: "庭師",
        GRAPHIC_DESIGNER: "グラフィックデザイナー",
        HISTORIAN: "歴史家",
        INTERPRETER: "通訳者",
        JOURNALIST: "ジャーナリスト",
        JUDGE: "裁判官",
        LAWYER: "弁護士",
        LIBRARIAN: "司書",
        MUSIC_TEACHER: "音楽教師",
        NAVIGATOR: "航海士",
        NURSE: "看護師",
        OFFICE_WORKER: "会社員",
        OPTICIAN: "眼鏡技師",
        PAINTER_ARTIST: "画家",
        PARAMEDIC: "救急救命士",
        PLUMBER: "配管工",
        RESEARCHER: "研究者",
        SINGER: "歌手",
        SPORTSPERSON: "スポーツ選手",
        SURGEON: "外科医",
        TAILOR: "仕立て屋",
        TECHNICIAN: "技術者",
        TOUR_GUIDE: "ツアーガイド",
        TRUCK_DRIVER: "トラック運転手",
        VETERINARIAN: "獣医",
        WELDER: "溶接工",
        ACTRESS: "女優",
        ANTHROPOLOGIST: "人類学者",
        ARCHEOLOGIST: "考古学者",
        ASTRONOMER: "天文学者",
        BAKER: "パン職人",
        BIOLOGIST: "生物学者",
        BOTANIST: "植物学者",
        BUTCHER: "肉屋",
        CARPENTER: "大工",
        CLERGY: "聖職者",
        COACH: "コーチ",
        CRAFTSMAN: "工芸職人",
        CURATOR: "学芸員",
        DATA_SCIENTIST: "データサイエンティスト",
        DIPLOMAT: "外交官",
        EDITOR: "編集者",
        GEOLOGIST: "地質学者",
        HAIRDRESSER: "美容師",
        INSPECTOR: "検査官",
        INVENTOR: "発明家",
        JEWELER: "宝石商",
        LECTURER: "講師",
        LOCKSMITH: "鍵師",
        MACHINIST: "機械工",
        MAGICIAN: "マジシャン",
        MERCHANT: "商人",
        METEOROLOGIST: "気象学者",
        MODEL: "モデル",
        MUSIC_CONDUCTOR: "指揮者",
        NAVAL_OFFICER: "海軍士官",
        OPERA_SINGER: "オペラ歌手",
        PAINTER_DECORATOR: "塗装工",
        PATHOLOGIST: "病理学者",
        PHILOSOPHER: "哲学者",
        PHILANTHROPIST: "慈善家",
        POLITICIAN: "政治家",
        PSYCHOLOGIST: "心理学者",
        RADIOLOGIST: "放射線技師",
        SAILOR: "船員",
        SALESPERSON: "販売員",
        SCULPTOR: "彫刻家",
        SOCIAL_WORKER: "ソーシャルワーカー",
        SOFTWARE_DEVELOPER: "ソフトウェア開発者",
        STATISTICIAN: "統計学者",
        STOCKBROKER: "株式仲買人",
        TAXI_DRIVER: "タクシー運転手",
        TELEVISION_HOST: "テレビ司会者",
        TRAIN_DRIVER: "列車運転士",
        TRAVEL_AGENT: "旅行代理店員",
        UX_DESIGNER: "UXデザイナー",
        VIDEO_EDITOR: "ビデオ編集者",
        WEB_DEVELOPER: "ウェブ開発者",
        WRITER_NOVELIST: "小説家",
        ZOOLOGIST: "動物学者",
        OTHER: "その他"
    };

    const allergyOptions = {
        EGG: "卵",
        MILK: "乳（牛乳）",
        WHEAT: "小麦",
        SHRIMP: "えび",
        CRAB: "かに",
        WALNUT: "くるみ",
        PEANUT: "落花生（ピーナッツ）",
        BUCKWHEAT: "そば"
    };

    useEffect(() => {
        console.log('SettingsForm mounted or reload triggered');
        // 現在の設定を取得
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/settings`);
                setFormData({
                    name: response.data.name || '',
                    age: response.data.age || '',
                    gender: response.data.gender || '',
                    occupation: response.data.occupation || '',
                    hobby: response.data.hobby || '',
                    allergies: response.data.allergies || [],
                });
                console.log('Fetched settings:', response.data); // デバッグ用ログ
            } catch (error) {
                console.error('設定の取得に失敗しました:', error);
            }
        };

        fetchSettings();
    }, [reload]); // `reload`が変更されるたびに再実行

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 必須項目のバリデーション
        if (!formData.name || !formData.age || !formData.gender) {
            setMessage('名前、年齢、性別は必須項目です。');
            return;
        }

        // 年齢のバリデーション
        if (formData.age <= 0) {
            setMessage('年齢は正の数でなければなりません。');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/settings`, formData);
            setMessage(response.data.status);
            console.log('Settings updated:', response.data); // デバッグ用ログ
        } catch (error) {
            console.error('設定の適用に失敗しました:', error);
            const errorMsg = error.response?.data?.error || '設定の送信中にエラーが発生しました。';
            setMessage(errorMsg);
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="名前"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    label="年齢"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel component="legend">性別</FormLabel>
                    <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                        <FormControlLabel value="MALE" control={<Radio />} label="男性" />
                        <FormControlLabel value="FEMALE" control={<Radio />} label="女性" />
                        <FormControlLabel value="OTHER" control={<Radio />} label="その他" />
                    </RadioGroup>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="occupation-label">職業</InputLabel>
                    <Select
                        labelId="occupation-label"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        label="職業"
                    >
                        <MenuItem value=""><em>なし</em></MenuItem>
                        {Object.entries(occupations).map(([key, value]) => (
                            <MenuItem key={key} value={key}>{value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="趣味"
                    name="hobby"
                    value={formData.hobby}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">アレルギー</FormLabel>
                    <FormGroup row> {/* 横並びにするために `row` 属性を追加 */}
                        {Object.entries(allergyOptions).map(([key, value]) => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        checked={formData.allergies.includes(key)}
                                        onChange={(e) => {
                                            const { value, checked } = e.target;
                                            setFormData((prevFormData) => {
                                                const updatedAllergies = checked
                                                    ? [...prevFormData.allergies, value]
                                                    : prevFormData.allergies.filter((allergy) => allergy !== value);
                                                return { ...prevFormData, allergies: updatedAllergies };
                                            });
                                        }}
                                        value={key}
                                    />
                                }
                                label={value}
                            />
                        ))}
                    </FormGroup>
                </FormControl>


                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    送信
                </Button>
            </form>
            {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
        </div>
    );
};

export default SettingsForm;
