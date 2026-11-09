use serde::{Deserialize, Serialize};
use ts_rs::TS;

/// A necklace design made up of one or more rows of pearls.
#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../frontend/src/types/")]
pub struct Necklace {
    pub name: String,
    pub rows: Vec<NecklaceRow>,
}

/// A single row in a necklace design.
#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../frontend/src/types/")]
pub struct NecklaceRow {
    pub pearls: Vec<Pearl>,
    /// An optional description of the repeating arrangement in this row.
    pub pattern: Option<String>,
}

/// A pearl and the visual properties used when rendering or building it.
#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../frontend/src/types/")]
pub struct Pearl {
    /// The pearl diameter in millimetres.
    pub size_mm: f32,
    /// A named colour or another CSS-compatible colour value.
    pub color: String,
    /// An optional description of the decoration or motif on the pearl.
    pub pattern: Option<String>,
}
