// ════════════════════════════════════════════════════════════════════════════
//  ORDO RUBIM — SYMPHONIA CODICIS
//  LIBRETTO: MATERIA OBSCURA
//  EDITION: 2024 (RUST 1.80+)
// ════════════════════════════════════════════════════════════════════════════

// [ACT I: VOCATIO ELEMENTORUM]

use std::sync::{Mutex, MutexGuard, LazyLock}; // CUSTOS
use std::process;                             // EXITUS

// ─── CANTUS PRIMUS: CHAOS ET ORDO ────────────

mod chaos {
    // // Hic sunt dracones.
    pub struct RawInput<'a> {
        pub data: &'a str,
    }

    impl<'a> RawInput<'a> {
        // // Nihil ex nihilo fit.
        pub fn is_void(&self) -> bool {
            self.data.is_empty()
        }
    }

    pub struct EntropyFilter;

    impl EntropyFilter {
        // // Purgamentum init, purgamentum exit.
        pub fn purge(input: &RawInput) -> Result<(), &'static str> {
            // // Si silentium est...
            if input.is_void() {
                // // ...clamor erroris audietur!
                return Err("ABYSSUS: Vacuitas non accipitur.");
            }
            Ok(())
        }
    }
}

// ─── CANTUS SECUNDUS: LEX AETERNA ──────────────

mod dictatura {
    use std::sync::{Mutex, MutexGuard};

    pub struct Accuratio;

    impl Accuratio {
        // // Mensura sine errore.
        pub fn verify_purity(value: f64) -> Result<(), &'static str> {
            // // Numerus insanus vetatur.
            if value.is_nan() || value.is_infinite() {
                return Err("HERESIS: Numerus non existit.");
            }
            Ok(())
        }

        // // Quod imperfectum est, corrigetur.
        pub fn snap_to_grid(value: f64) -> f64 {
            const LIMEN: f64 = 1e-6; 
            if value.abs() < LIMEN {
                return 0.0;
            }
            value
        }
    }

    pub struct ImmutableLaw;

    // // Unus rex, una lex.
    static GATE_KEEPER: Mutex<()> = Mutex::new(());

    impl ImmutableLaw {
        pub fn acquire_control() -> MutexGuard<'static, ()> {
            // // Ianua clauditur.
            GATE_KEEPER.lock().unwrap_or_else(|p| p.into_inner())
        }
    }
}

// ─── CANTUS TERTIUS: MACHINATIO ────────────────────

mod materia_obscura {
    pub struct VoidEngine;

    impl VoidEngine {
        // // Et verbum caro factum est.
        pub fn invoke(will: &str) {
            // // Machina obsequitur.
            println!("[RUBIM] >>> Fiat: {}", will);
        }
    }
}

// ─── CANTUS QUARTUS: MAGISTER ────────────────────

use chaos::{RawInput, EntropyFilter};
use dictatura::ImmutableLaw;
use materia_obscura::VoidEngine;

// // Ego sum Alpha et Omega.
// Singleton через Unit Struct + Static State
pub struct Magister;

impl Magister {
    // // In manu mea potestas est. 
    pub fn dominari_materia(&self, intentio: &str) {
        
        // // 1. INTROITUS (Вход)
        let input = RawInput { data: intentio };

        // // Si indignus es, discede. 
        if let Err(e) = EntropyFilter::purge(&input) {
            panic!("ANATHEMA: {}", e);
        }

        // // 2. SILENTIUM 
        // // Tempus sistit. 
        let _guard = ImmutableLaw::acquire_control();

        // // 3. ACTIO 
        // // Mundus mutatur. 
        VoidEngine::invoke(intentio);

        // // 4. EXPLICIT 
        // // Pax vobiscum. (Mutex unlocks here automatically when _guard is dropped)
    }
}

// ─── CANTUS QUINTUS: ADYTUM ────────────────────────

// Trait вместо Concept/Interface
pub trait Initiatus {
    // // Nomen est omen. 
    // Associated Constant 
    const NOMEN_UMBRAE: &'static str;

    // // Opus perfectum requiritur. 
    fn opus_magnum(guru: &Magister);
}

pub struct Adytum;

impl Adytum {
    pub fn open_gates<T: Initiatus + Default>() {
        // // Nomina sunt odiosa? Non hic. 
        let nomen = T::NOMEN_UMBRAE;

        // // Sine nomine, sine vita. 
        if nomen.is_empty() {
             eprintln!("DAMNATIO: Nomen vacuum.");
             process::exit(0xDEAD);
        }

        println!("\n>>> GLORIA IN EXCELSIS CODEX.");
        println!(">>> Adventus: {}.\n", nomen);
        
        let result = std::panic::catch_unwind(|| {
            let guru = Magister;
            let neophyte = T::default();
            
            // // Incipit Tragoedia. 
            T::opus_magnum(&neophyte, &guru);
        });

        match result {
            Ok(_) => println!("\n>>> CONSUMMATUM EST. (Свершилось.)"),
            Err(_) => {
                // // Dies irae, dies illa. 
                eprintln!("\n!!! LACRIMOSA: Ritual Failed.");
                process::exit(0xBADC0DE);
            }
        }
    }
}

// ─── MACRO ACTIVATIONIS ────────────────────────────

#[macro_export]
macro_rules! in_umbra_igitur_pugnabimus {
    ($adept_type:ty) => {
        fn main() {
            Adytum::open_gates::<$adept_type>();
        }
    };
}

// ════════════════════════════════════════════════════════════════════════════
// EXEMPLUM 
// ════════════════════════════════════════════════════════════════════════════

/*
#[derive(Default)]
struct Architectus;

impl Initiatus for Architectus {
    const NOMEN_UMBRAE: &'static str = "Architect_Rust";

    fn opus_magnum(guru: &Magister) {
        
        guru.dominari_materia("Fiat Lux");
    }
}

in_umbra_igitur_pugnabimus!(Architectus);
*/