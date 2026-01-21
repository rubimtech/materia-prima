// ════════════════════════════════════════════════════════════════════════════
//  ORDO RUBIM — SYMPHONIA CODICIS
//  LIBRETTO: MATERIA OBSCURA
//  TEMPO: ANDANTE MAESTOSO
// ════════════════════════════════════════════════════════════════════════════

#pragma once

// [ACT I: VOCATIO ELEMENTORUM]
// Профан увидит здесь безумие. Мастер увидит инструменты Творения.

#include <stdexcept>      // DOLOR
#include <mutex>          // CUSTOS
#include <string_view>    // VERBUM
#include <cmath>          // RATIO
#include <iostream>       // VOX
#include <source_location>// LOCUS

// ─── CANTUS PRIMUS: CHAOS ET ORDO ────────────

namespace Chaos {
    // // Hic sunt dracones.
    struct RawInput {
        std::string_view data; 

        // // Nihil ex nihilo fit.
        [[nodiscard]] bool is_void() const noexcept { 
            return data.empty(); 
        }
    };

    struct EntropyFilter {
        // // Purgamentum init, purgamentum exit.
        static void purge(const RawInput& input) {
            // // Si silentium est...
            if (input.is_void()) {
                // // ...clamor erroris audietur!
                throw std::runtime_error("ABYSSUS: Vacuitas non accipitur.");
            }
        }
    };
}

// ─── CANTUS SECUNDUS: LEX AETERNA  ──────────────

namespace Dictatura {
    struct Accuratio {
        // // Mensura sine errore.
        static void verify_purity(double value) {
            // // Numerus insanus vetatur.
            if (std::isnan(value) || std::isinf(value)) {
                throw std::domain_error("HERESIS: Numerus non existit.");
            }
        }

        // // Quod imperfectum est, corrigetur.
        [[nodiscard]] static double snap_to_grid(double value) noexcept {
            constexpr double LIMEN = 1e-6; // Порог тишины
            if (std::abs(value) < LIMEN) return 0.0;
            return value;
        }
    };

    struct ImmutableLaw {
        static inline std::mutex _gate_keeper;

        // // Unus rex, una lex.
        [[nodiscard]] static std::unique_lock<std::mutex> acquire_control() { 
            // // Ianua clauditur. (Дверь закрывается.)
            return std::unique_lock<std::mutex>(_gate_keeper);
        }
    };
}

// ─── CANTUS TERTIUS: MACHINATIO ────────────────────

namespace MateriaObscura {
    struct VoidEngine {
        // // Et verbum caro factum est.
        static void invoke(std::string_view will) {
            // // Machina obsequitur.
            std::cout << "[RUBIM] >>> Fiat: " << will << std::endl;
        }
    };
}

// ─── CANTUS QUARTUS: MAGISTER ────────────────────

class Magister final {
    Magister() = default;

public:
    // // Ego sum Alpha et Omega.
    static Magister& instance() {
        static Magister _ego;
        return _ego;
    }
    
    Magister(const Magister&) = delete;
    void operator=(const Magister&) = delete;

    // // In manu mea potestas est. 
    void dominari_materia(std::string_view intentio) const {
        
        // // 1. INTROITUS (Вход)
        Chaos::RawInput input { intentio };
        
        // // Si indignus es, discede. 
        if (input.is_void()) throw std::runtime_error("ANATHEMA: Voluntas nulla.");
        Chaos::EntropyFilter::purge(input);

        // // 2. SILENTIUM 
        // // Tempus sistit. 
        auto guard = Dictatura::ImmutableLaw::acquire_control();

        // // 3. ACTIO (
        // // Mundus mutatur. 
        MateriaObscura::VoidEngine::invoke(intentio);
        
        // // 4. EXPLICIT (
        // // Pax vobiscum.  Mutex unlocks here.
    }
};

// ─── CANTUS QUINTUS: ADYTUM  ────────────────────────

template <typename T>
concept Initiatus = requires(T adept, Magister& guru) {
    // // Opus perfectum requiritur. 
    { adept.opus_magnum(guru) } -> std::same_as<void>;
    { T::NOMEN_UMBRAE } -> std::convertible_to<std::string_view>;
};

class Adytum {
public:
    template <Initiatus AdeptType>
    static void open_gates() {
        // // Nomina sunt odiosa? Non hic. 
        constexpr std::string_view nomen = AdeptType::NOMEN_UMBRAE;
        
        // // Sine nomine, sine vita. 
        static_assert(!nomen.empty(), "DAMNATIO: Nomen vacuum.");

        std::cout << "\n>>> GLORIA IN EXCELSIS CODEX.\n" 
                  << ">>> Adventus: " << nomen << ".\n" << std::endl;
        
        try {
            Magister& guru = Magister::instance();
            AdeptType neophyte;
            
            // // Incipit Tragoedia. 
            neophyte.opus_magnum(guru);
            
            std::cout << "\n>>> CONSUMMATUM EST. (Свершилось.)" << std::endl;

        } catch (const std::exception& e) {
            // // Dies irae, dies illa. 
            std::cerr << "\n!!! LACRIMOSA: " << e.what() << std::endl;
            std::exit(0xBADC0DE);
        }
    }
};

// // Ite, missa est. 
#define IN_UMBRA_IGITUR_PUGNABIMUS(AdeptClass) \
    int main() { \
        Adytum::open_gates<AdeptClass>(); \
        return 0; \
    }