use serde::{Deserialize, Serialize};

/// A necklace design made up of one or more rows of pearls.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Necklace {
    pub rows: Vec<NecklaceRow>,
    pub ribbon: Ribbon,
    pub folk_ribbon: FolkRibbon,
}

/// A single row in a necklace design.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NecklaceRow {
    pub pearls: Vec<Pearl>,
}

/// A pearl and the visual properties used when rendering or building it.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Pearl {
    /// The pearl diameter in millimetres.
    pub size_mm: f32,
    /// A named colour or another CSS-compatible colour value.
    pub color: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Ribbon {
    pub color: String,
    pub width_mm: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FolkRibbon {
    pub ribbon: Ribbon,
}
