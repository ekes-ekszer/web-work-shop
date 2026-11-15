use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct PearlId(pub String);

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct RibbonId(pub String);

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct EndBandId(pub String);


#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq)]
pub struct Millimeters(pub f32);

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq, Hash)]
#[serde(rename_all = "lowercase")]
pub enum Color {
    Transparent,
    White,
    Black,
    Brown,
    Beige,
    Red,
    Orange,
    Yellow,
    Green,
    Turquoise,
    Blue,
    Purple,
    Pink,
    Gold,
    Silver,
    RoseGold,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Necklace {
    pub rows: Vec<NecklaceRow>,
    pub ribbon: RibbonId,
    pub end_band: EndBandId,
    pub end_pearl: PearlId,
    pub end_length_mm: Millimeters,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NecklaceRow {
    pub pattern: Vec<PearlId>,
    pub full_length_mm: Millimeters,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Pearl {
    pub id: PearlId,
    pub color: Color,
    pub length_mm: Millimeters,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Ribbon {
    pub id: RibbonId,
    pub color: Color,
    pub width_mm: Millimeters,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EndBand {
    pub id: EndBandId,
    pub color: Color,
    pub width_mm: Millimeters, 

}
