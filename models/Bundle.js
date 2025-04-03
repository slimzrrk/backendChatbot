module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Bundle', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    creator_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    image_cover: DataTypes.STRING,
    video_demo: DataTypes.STRING,
    video_demo_source: DataTypes.ENUM('upload', 'youtube', 'vimeo', 'external_link'),
    price: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    subscribe: DataTypes.BOOLEAN,
    access_days: DataTypes.INTEGER,
    message_for_reviewer: DataTypes.TEXT,
    status: DataTypes.ENUM('active', 'pending', 'is_draft', 'inactive'),
    created_at: DataTypes.BIGINT,
    updated_at: DataTypes.BIGINT
  }, {
    tableName: 'bundles',
    timestamps: false
  });
};