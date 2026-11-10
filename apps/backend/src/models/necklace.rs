use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Necklace {
    pub rows: Vec<NecklaceRow>,
    pub ribbon: Ribbon,
    pub end_band: EndBand,
    pub end_pearl: Pearl,
    pub end_length_mm: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NecklaceRow {
    pub pattern: Vec<Pearl>,
    pub end_pearl: &Pearl,
    pub end_length_mm: &f32,
    pub full_length_mm: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Pearl {
    pub id: String,
    pub color: String,
    pub length_mm: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Ribbon {
    pub id: String,
    pub color: String,
    pub width_mm: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EndBand {
    pub id: String,
    pub color: String,
    pub width_mm: f32, 

}
