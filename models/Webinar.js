module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Webinar', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    teacher_id: DataTypes.INTEGER,
    creator_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    type: DataTypes.ENUM('webinar', 'course', 'text_lesson'),
    private: DataTypes.BOOLEAN,
    slug: DataTypes.STRING(255),
    start_date: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    image_cover: DataTypes.STRING(255),
    status: DataTypes.ENUM('active', 'pending', 'is_draft', 'inactive'),
    created_at: DataTypes.INTEGER,
    updated_at: DataTypes.INTEGER,
    deleted_at: DataTypes.INTEGER,
    level_id: DataTypes.INTEGER,
    matiere_id: DataTypes.INTEGER,
    seo_description: DataTypes.STRING(128),
    thumbnail: DataTypes.STRING(255),
    video_demo: DataTypes.STRING(255),
    capacity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    support: DataTypes.BOOLEAN,
    downloadable: DataTypes.BOOLEAN,
    partner_instructor: DataTypes.BOOLEAN,
    subscribe: DataTypes.BOOLEAN,
    forum: DataTypes.BOOLEAN,
    access_days: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    message_for_reviewer: DataTypes.TEXT,
    submaterial_id: DataTypes.INTEGER
  }, {
    tableName: 'webinars',
    timestamps: false
  });
};